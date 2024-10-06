import React from 'react'

const Feb = ({todayDate, FebGrid, options, date}) => {
  return (
    <div>
        <div>
        <p>Feb Heat map</p>
      <p>Date: {date.toLocaleString('en-US', options).slice(0,2)}</p>
<div className='grid grid-cols-7 gap-2'>
    {
        FebGrid.fill(27).map((day, index) => {
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
    </div>
  )
}

export default Feb
