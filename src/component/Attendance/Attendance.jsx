import React, { useEffect, useState } from "react";

const Attendance = () => {
  const [userList, setUserList] = useState([]);

  // Create an array for dates 1 to 30
  const dates = Array.from({ length: 30 }, (_, i) => i + 1);

  // Function to fetch users from the API
  const fetchUsers = async () => {
    const response = await fetch("/users"); // Update with your API endpoint
    const data = await response.json();
    setUserList(data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full table-auto border-collapse">
        <thead>
          <tr>
            <th className="px-4 py-2 bg-gray-200 border">Names</th>
            {dates.map((date) => (
              <th key={date} className="px-4 py-2 bg-gray-200 border">
                {date}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {userList.map((user) => {
            // Access the user's login date from the createdAt field
            const userCreatedAt = new Date(user.createdAt);
            const userLoginDate = userCreatedAt.getDate(); // Get the day of the month

            return (
              <tr key={user._id} className="bg-white">
                <td className="px-4 py-2 border">{user.username}</td>
                {dates.map((date) => (
                  <td key={date} className="px-4 py-2 border text-center">
                    {userLoginDate === date ? "Present" : "Absent"}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Attendance;
