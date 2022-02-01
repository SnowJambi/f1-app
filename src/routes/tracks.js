import { useState, useEffect } from 'react';

export default function Tracks() {
  let storedYear = JSON.parse(window.sessionStorage.getItem('trackYear'))
  let storedInput = JSON.parse(window.sessionStorage.getItem('trackInput'))
  const [input, setInput] = useState( storedInput !== null ? storedInput : '2021')
  const [year, setYear] = useState( storedYear !== null ? storedYear : '2021' )
  const [isLoading, setIsLoading] = useState(true)

  const getTracks = async (year) => {
    let url = `http://ergast.com/api/f1/${year}/circuits.json`
    console.log(url)
    try {
      let res = await fetch(url)
      let data = await res.json()
      let circuits = data.MRData.CircuitTable
      return circuits
    } catch (error) {
      console.log(error)
    }
  }

  const [tracks, setTracks] = useState([])

  useEffect(async () => {
    setIsLoading(true)
    window.sessionStorage.setItem('trackYear', JSON.stringify(year))
    let storedTracks = JSON.parse(window.localStorage.getItem(`tracks-${year}`))
    if (storedTracks !== null) {
      setTracks(storedTracks)
      setIsLoading(false)
    } else {
      let circuits = await getTracks(year)
      setTracks(circuits)
      window.localStorage.setItem(`tracks-${year}`, JSON.stringify(circuits))
      setIsLoading(false)
    }
  }, [year])

  useEffect(() => {
    window.sessionStorage.setItem('trackInput', JSON.stringify(input))
  }, [input])

  const onClick = async () => {
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
