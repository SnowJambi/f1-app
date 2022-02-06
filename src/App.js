import { Routes, Route, Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import './styles/reset.scss';
import './styles/App.scss';

export default function App() {

  const [races, setRaces] = useState()
  const [nextRace, setNextRace] = useState()
  const [isLoading, setIsLoading] = useState(true)
  const [date, setDate] = useState(new Date())
  const [nextRaceDate, setNextRaceDate] = useState()
  const [timeRem, setTimeRem] = useState()


  // Query the API for current year races
  const getRaces = () => {
    let url = `https://ergast.com/api/f1/2022.json`
    console.log(url)
    return fetch(url)
    .then(res => res.json())
  }


  // Given a value in milliseconds, calculate countdown
  const timeRemaining = (ms) => {
    let seconds = Math.floor(ms / 1000)
    let minutes = Math.floor(seconds / 60)
    let hours = Math.floor(minutes / 60)
    let days = Math.floor(hours / 24)

    let dString = days ? days.toString() + ' days, ' : ''
    let hString = days || hours ? (hours % 24).toString() + ' hours, ' : ''
    let mString = days || hours || minutes ? (minutes % 60).toString() + ' minutes, ' : ''
    let sString = days || hours || minutes || seconds ? (seconds % 60).toString() + ' seconds' : ''

    return dString + hString + mString + sString
  }

  // On page load, fetch races for current year if cached, otherwise query the API. Set current time.
  useEffect(() => {
    setIsLoading(true)
    let storedRaces = JSON.parse(window.localStorage.getItem('races-2022'))
    if (storedRaces !== null) {
      setRaces(storedRaces)
    } else {
      getRaces(2022)
      .then((res) => {
        let races = res.MRData.RaceTable
        setRaces(races)
        window.localStorage.setItem('races-2022', JSON.stringify(races))
      })
    }

    let clock = setInterval(() => setDate(new Date()), 1000)

    return () => clearInterval(clock)
  }, [])

  // Once we get the races for the current year, get the next upcoming race and finish loading
  useEffect (() => {
    if (races) {
      let nextRace = false
      for (let i = 0; i < races.Races.length; i++) {
        let raceDate = new Date(races.Races[i].date + 'T' + races.Races[i].time)
        if (raceDate.getTime() > date.getTime()) {
          nextRace = races.Races[i]
          setNextRaceDate(raceDate)
          break;
        }
      }
      setNextRace(nextRace)
    }
    setIsLoading(false)
  }, [races])

  // Once we have the next race date, show the remaining time
  useEffect (() => {
    if (nextRaceDate) setTimeRem(nextRaceDate.getTime() - (new Date()).getTime())
    let remaining = setInterval(() => setTimeRem(nextRaceDate.getTime() - (new Date()).getTime()), 1000)
    return () => clearInterval(remaining)
  }, [nextRaceDate])

  return (
    <div>
      <h1>Hello!</h1>
      <p>{date.toLocaleString()}</p>
      <nav style={{ borderBottom: "solid 1px", paddingBottom: "1rem"}}>
        {/* <Link to="/drivers">Drivers</Link> |{" "} */}
        <Link to="schedule">Schedule</Link>
      </nav>
      <div>{ nextRace ? 
        <div>The next race is the {nextRace.raceName} in {timeRemaining(timeRem)}</div>
        : 'No more races this season :(' }
      </div>
    </div>
  );
}
