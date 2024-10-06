import React from 'react'

const ThirtyDay = ({todayDate, thirtyGrid, options, date}) => {
  return (
    <div>
    <p>30 days heat map</p>
      <p>Date: {date.toLocaleString('en-US', options).slice(0,2)}</p>
<div className='grid grid-cols-7 gap-2'>
    {
        thirtyGrid.fill(30).map((day, index) => {
            return (
                <div className={`w-10 h-10 
                ${index < todayDate ? 'bg-green-500' : 'bg-red-500'  } border-2 border-red-500`} key={index}>
                    { index + 1}
                </div>
            )
        })
    }
</div>
    </div>
  )
}

export default ThirtyDay
