import React from 'react'
import ThirtyDay from './ThirtyDay';
import ThirtyOne from './ThirtyOne';
import Feb from './Feb';

const Attendance = () => {
    const monthGrid = new Array(31)
    const thirtyGrid = new Array(30)
    const FebGrid = new Array(27)
    const date = new Date();
    const options = {
        timeZone: 'Asia/Kolkata', 
        year: 'numeric', 
        month: '2-digit', 
        day: '2-digit',
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit'
      }; 
      const todayDate = date.toLocaleString('en-US', options).slice(0,2)
  return (
    <>
    <div>
      Track attendance here
</div>
<ThirtyDay todayDate={todayDate} thirtyGrid={thirtyGrid} options={options} date={date}/>
<ThirtyOne todayDate={todayDate} monthGrid={monthGrid} options={options} date={date}/>
<Feb todayDate={todayDate} FebGrid={FebGrid} options={options} date={date}/>
    </>
  )
     
  
}

export default Attendance
