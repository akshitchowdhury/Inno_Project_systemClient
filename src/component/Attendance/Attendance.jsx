import React, { useEffect, useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";

const Attendance = () => {
  const [userList, setUserList] = useState([]);
  const [currentWeek, setCurrentWeek] = useState(0);
  const [isResetAvailable, setIsResetAvailable] = useState(false);

  // Create an array for dates 1 to 31
  const dates = Array.from({ length: 31 }, (_, i) => i + 1);
const baseUrl = import.meta.env.VITE_API_URL;
  // Function to fetch users from the API
  const fetchUsers = async () => {
    const response = await fetch(`${baseUrl}/users`); // Update with your API endpoint
    const data = await response.json();
    setUserList(data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Get the current week's dates
  const getCurrentWeekDates = () => {
    const startIndex = currentWeek * 7;
    return dates.slice(startIndex, startIndex + 7);
  };

  // Navigate to the next week
  const nextWeek = () => {
    if (currentWeek < Math.ceil(dates.length / 7) - 1) {
      setCurrentWeek(currentWeek + 1);
    }
  };

  // Navigate to the previous week
  const prevWeek = () => {
    if (currentWeek > 0) {
      setCurrentWeek(currentWeek - 1);
    }
  };

  // Check if all dates (1-31) are marked for all users
  useEffect(() => {
    const allMarked = userList.every((user) => {
      const userLoginDates = userList.map((user) => new Date(user.loggedInAt).getDate());
      return dates.every((date) => userLoginDates.includes(date));
    });

    if (allMarked) {
      setIsResetAvailable(true);
    }
  }, [userList]);

  // Reset function to reset calendar state
  const resetCalendar = () => {
    setCurrentWeek(0);
    setUserList([]); // Assuming this will reset the user attendance data
    setIsResetAvailable(false); // Disable reset button after reset
    fetchUsers(); // Optionally, refetch users
  };

  return (
    <div className="p-4">
    <div className="container mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Attendance Calendar</h2>
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={prevWeek}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-200 ease-in-out"
          disabled={currentWeek === 0}
        >
          <ChevronLeftIcon className="h-5 w-5" />
        </button>
        <span className="text-lg font-semibold text-gray-700">
          Week {currentWeek + 1}
        </span>
        <button
          onClick={nextWeek}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-200 ease-in-out"
          disabled={currentWeek === Math.ceil(dates.length / 7) - 1}
        >
          <ChevronRightIcon className="h-5 w-5" />
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead>
            <tr>
              <th className="px-4 py-2 bg-gray-100 border text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Names
              </th>
              {getCurrentWeekDates().map((date) => (
                <th key={date} className="px-4 py-2 bg-gray-100 border text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  {date}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {userList.map((user) => {
              const userCreatedAt = new Date(user.loggedInAt);
              const userLoginDate = userCreatedAt.getDate();

              return (
                <tr key={user._id}>
                  <td className="px-4 py-2 border text-sm text-gray-900">
                    {user.username}
                  </td>
                  {getCurrentWeekDates().map((date) => (
                    <td key={date} className="px-4 py-2 border text-center">
                      {userLoginDate === date ? (
                        <span className="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-green-100 bg-green-500 rounded-full">
                          Present
                        </span>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Reset Button */}
      {isResetAvailable && (
        <div className="mt-4">
          <button
            onClick={resetCalendar}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition duration-200 ease-in-out"
          >
            Reset Calendar
          </button>
        </div>
      )}
    </div>
    </div>
  );
};

export default Attendance;
