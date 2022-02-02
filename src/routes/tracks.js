import { useState, useEffect } from 'react';
import { Track, TrackPlaceholder } from '../components/Track';

export default function Tracks() {
  let storedYear = JSON.parse(window.sessionStorage.getItem('trackYear'))
  
  let storedInput = JSON.parse(window.sessionStorage.getItem('trackInput'))
  const [input, setInput] = useState( storedInput !== null ? storedInput : '2022')
  const [year, setYear] = useState( storedYear !== null ? storedYear : '2022' )
  const [tracks, setTracks] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const getTracks = (year) => {
    let url = `https://ergast.com/api/f1/${year}.json`
    console.log(url)
    return fetch(url)
    .then(res => res.json())
  }

  useEffect(() => {
    setIsLoading(false)
  }, [tracks])

  useEffect(() => {
    setIsLoading(true)
    window.sessionStorage.setItem('trackYear', JSON.stringify(year))
    let storedTracks = JSON.parse(window.localStorage.getItem(`tracks-${year}`))
    if (storedTracks !== null) {
      setTracks(storedTracks)
    } else {
      getTracks(year)
      .then((res) => {
        let races = res.MRData.RaceTable
        setTracks(races)
        window.localStorage.setItem(`tracks-${year}`, JSON.stringify(races))
      })
    }
  }, [year])

  useEffect(() => {
    window.sessionStorage.setItem('trackInput', JSON.stringify(input))
  }, [input])

  const onClick = () => {
    setYear(input)
  }

  const onChange = (e) => {
    setInput(e.target.value)
    window.sessionStorage.setItem('trackInput', JSON.stringify(input))
  }

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
        <h1>{year} Formula 1 Race Schedule</h1>
        <select name="years" value={year} readOnly={true}>
          {getYears(1950,2022).map((year) => {
            return <option key={year}>{year}</option>
          })}
        </select>
        <button>View schedule</button>
        <div className='tracks'>
          {Array.from(Array(25)).map((_,index) => <TrackPlaceholder key={index} />)}
        </div>
      </>
    )
  }

  return (
    <>
      <h1>{year} Formula 1 Race Schedule</h1>
      <select name="years" onChange={onChange} value={input}>
        {getYears(1950,2022).map((year) => {
          return <option value={year} key={year}>{year}</option>
        })}
      </select>
      <button onClick={onClick}>View schedule</button>
      <div className='tracks'>
        {tracks.Races.map((race) => {
          return <Track key={race.round} race={race} />
        })}
      </div>
    </>
  )
}

