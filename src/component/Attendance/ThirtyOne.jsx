import React, { useEffect, useState } from 'react';

const ThirtyOne = ({ todayDate,refresh,setRefrsh, monthGrid, options, date }) => {
  

  
  return (
    <div>
    <button className='p-2 bg-green-500 text-xl' onClick={() => setRefrsh(true)}>Refresh heat map</button>
      <p>31 days heat map</p>
      <p>Date: {date.toLocaleString('en-US', options).slice(4, 5)}</p>
      <div className='grid grid-cols-7 gap-2'>
        { !refresh? 
        ( monthGrid.fill(31).map((day, index) => (
          <div
          
            className={`w-10 h-10
             ${index < todayDate ? 'bg-green-500' : 'bg-red-500'} border-2 border-red-500`}
            key={index}
          >
            {index + 1}
          </div>
        ))): (
        monthGrid.fill(31).map((day, index) => (
          <div
            className={`w-10 h-10 
            bg-gray-500'  } border-2 border-red-500`}
            key={index}
          >
            {index + 1}
          </div>
        )))
        }
      </div>
    </div>
  );
};

export default ThirtyOne;
