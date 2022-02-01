import { useState, useEffect } from 'react';

export default function Tracks() {
  let storedYear = JSON.parse(window.sessionStorage.getItem('trackYear'))
  let storedInput = JSON.parse(window.sessionStorage.getItem('trackInput'))
  const [input, setInput] = useState( storedInput !== null ? storedInput : '2021')
  const [year, setYear] = useState( storedYear !== null ? storedYear : '2021' )
  const [tracks, setTracks] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const getTracks = (year) => {
    let url = `https://ergast.com/api/f1/${year}/circuits.json`
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
        let circuits = res.MRData.CircuitTable
        setTracks(circuits)
        window.localStorage.setItem(`tracks-${year}`, JSON.stringify(circuits))
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
        <select name="years" value={year} readOnly={true}>
          {getYears(1950,2021).map((year) => {
            return <option>{year}</option>
          })}
        </select>
        <button>View</button>
        <div>year: {year}</div>
        <div>tracks: </div>
        <div>Loading tracks...</div>
      </>
    )
  }

  return (
    <>
      <select name="years" onChange={onChange} value={input}>
        {getYears(1950,2021).map((year) => {
          return <option value={year}>{year}</option>
        })}
      </select>
      <button onClick={onClick}>View</button>
      <div>year: {year}</div>
      <div>tracks: </div>
      <ul>
        {tracks.Circuits.map((circuit) => {
          return <li>{circuit.circuitName}</li>
        })}
      </ul>
    </>
  )
}
