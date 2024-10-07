import React, { useState } from 'react';
import ThirtyDay from './ThirtyDay';
import ThirtyOne from './ThirtyOne';
import Feb from './Feb';

const Attendance = () => {
    const monthGrid = new Array(31);
    const thirtyGrid = new Array(30);
    const FebGrid = new Array(27);
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
      
    const todayDate = date.toLocaleString('en-US', options).slice(4,5);
    const [refresh, setRefrsh] = useState(false);
    const [selectedMonthType, setSelectedMonthType] = useState('31-Day Month'); // Default selection
    const[toggleList,setToggleList] = useState(false)
    const monthTypes = [
        { name: '30-Day Month',
             component: <ThirtyDay todayDate={todayDate} thirtyGrid={thirtyGrid} options={options} date={date}/> },
        { name: '31-Day Month', 
            component: <ThirtyOne refresh={refresh} setRefrsh={setRefrsh} todayDate={todayDate} monthGrid={monthGrid} options={options} date={date}/> },
        { name: 'February',
             component: <Feb todayDate={todayDate} FebGrid={FebGrid} options={options} date={date}/> },
    ];

    return (
        <>
            <div className='p-12'>
                <p className='text-xl'>Track Attendance Here</p>
                <p className='text-lg'>Select Month Type</p>

                {/* Dropdown button for month types */}
                <div className="relative inline-block text-left">
                    <div>
                        <button 
                            onClick={()=>setToggleList(!toggleList)}
                            className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                            id="options-menu" 
                            aria-haspopup="true" 
                            aria-expanded="true"
                        >
                            {selectedMonthType}
                        </button>
                    </div>

                    {
                        toggleList && (
                            <>
                    <div className="origin-top-right absolute -right-56 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                            {monthTypes.map((month, index) => (
                                <button
                                    key={index}
                                    onClick={() => setSelectedMonthType(month.name)}
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                                    role="menuitem"
                                >
                                    {month.name}
                                </button>
                            ))}
                        </div>
                    </div>
                    </>
                        )
                    }
                </div>
            </div>

            {/* Render selected month type's component */}
            <div className="mt-6">
                {monthTypes.find(month => month.name === selectedMonthType)?.component}
            </div>
        </>
    );
}

export default Attendance;
