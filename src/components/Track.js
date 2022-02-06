import React from 'react';

export function Track({race}) {

  let date = new Date(race.date + 'T' + race.time)
  let time = date.toLocaleTimeString().split(':')
  let period = time[2].split(' ').pop()
  time.pop()
  time = time.join(':') + ' ' + period


  return (
    <div className='track'>
      <div className='container'>
        <p className='round'>Round {race.round}</p>
        <h2>{race.raceName}</h2>
        <div className='track-details'>
          <p>{race.Circuit.circuitName}</p>
          <p>{date.toDateString()}</p>
          <p>{time}</p>
        </div>
      </div>
    </div>
  )
}

export function TrackPlaceholder() {
  return (
  <div className='track-placeholder'>
      <div className='container'>
        <p className='round blink'></p>
        <h2><span className='blink' /></h2>
        <div className='track-details'>
          <p className='blink'></p>
          <p className='blink'></p>
          <p className='blink'></p>
        </div>
      </div>
    </div>
    )
}