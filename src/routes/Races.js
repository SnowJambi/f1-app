import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Race, RacePlaceholder } from '../components/Race.js';

export default function Races() {
  let storedYear = JSON.parse(window.sessionStorage.getItem('raceYear'))
  let storedInput = JSON.parse(window.sessionStorage.getItem('raceInput'))
  const [input, setInput] = useState( storedInput !== null ? storedInput : '2022')
  const [year, setYear] = useState( storedYear !== null ? storedYear : '2022' )
  const [races, setRaces] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  // Query the API with the currently selected year
  const getRaces = (year) => {
    let url = `https://ergast.com/api/f1/${year}.json`
    console.log(url)
    return fetch(url)
    .then(res => res.json())
  }

  // Finish loading once we have the races
  useEffect(() => {
    setIsLoading(false)
  }, [races])

  // Once the year is set, get the races for that year from cache if it
  // exists there, otherwise query the API and set that state as well
  // as save it in localStorage for future use
  useEffect(() => {
    setIsLoading(true)
    window.sessionStorage.setItem('raceYear', JSON.stringify(year))
    let storedRaces = JSON.parse(window.localStorage.getItem(`races-${year}`))
    if (storedRaces !== null) {
      setRaces(storedRaces)
    } else {
      getRaces(year)
      .then((res) => {
        let races = res.MRData.RaceTable
        setRaces(races)
        window.localStorage.setItem(`races-${year}`, JSON.stringify(races))
      })
    }
  }, [year])

 
  // Update session storage for year when its state is updated
  useEffect(() => {
    window.sessionStorage.setItem('raceInput', JSON.stringify(input))
  }, [input])

  // Set state to selected year when clicking the button
  const onClick = () => {
    setYear(input)
  }

  // Update input state when changing the year
  const onChange = (e) => {
    setInput(e.target.value)
  }

  // Generate array of specifc length to map to
  let getYears = (start,end) => {
    let arr = []
    for (let i = end; i >= start; i--) {
        arr.push(i)
    }
    return arr
  }
  
  if (isLoading) {
    return (
      <>
        <nav>
          <Link to={'/'}>Home</Link>
        </nav>
        <h1>{year} Formula 1 Race Schedule</h1>
        <select name="years" value={year} readOnly={true}>
          {getYears(1950,2022).map((year) => {
            return <option key={year}>{year}</option>
          })}
        </select>
        <button>View schedule</button>
        <div className='races'>
          {Array.from(Array(25)).map((_,index) => <RacePlaceholder key={index} />)}
        </div>
      </>
    )
  }

  return (
    <>
      <nav>
        <Link to={'/'}>Home</Link>
      </nav>
      <h1>{year} Formula 1 Race Schedule</h1>
      <select name="years" onChange={onChange} value={input}>
        {getYears(1950,2022).map((year) => {
          return <option value={year} key={year}>{year}</option>
        })}
      </select>
      <button onClick={onClick}>View schedule</button>
      <div className='races'>
        {races.Races.map((race) => {
          return <Race key={race.round} race={race} />
        })}
      </div>
    </>
  )
}

