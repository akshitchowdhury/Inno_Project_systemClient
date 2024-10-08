import React, { useEffect, useState } from 'react';
import AuthTest from './AuthTest/AuthTest';
import CreateUsers from './CreateUsers/CreateUsers';


const Users = () => {
  const [userList, setUserList] = useState([]);
  const [projectList, setProjectList] = useState([]);
  const fetchUsers = async () => {
    try {
      const response = await fetch('/users', {
        method: 'GET',
      });

      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }

      const data = await response.json();
      setUserList(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const fetchProjects = async () => {
    try {
      const response = await fetch('/projects/fetchProjects', {
        method: 'GET',
      });
      if (!response.ok) {
        throw new Error('Failed to fetch projects');
      }
      const data = await response.json();
      setProjectList(data);
    } catch (error) {
      console.error('Error fetching projects:', error);
      // setErrorMessage('Could not load projects. Please try again.');
    }
  };

  const handleDeletion = async (id) => {
    try {
      const response = await fetch(`/users/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete user');
      }

      // Remove the user from the UI
      setUserList(userList.filter((user) => user._id !== id));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  
  useEffect(() => {
    fetchUsers();
    fetchProjects();
  }, [userList]);

  return (
    <>
    {/* <AuthTest/> */}
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Users List</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {userList.map((user) => {
  const userProject = projectList.find((project) => project.assignedTo === user.username);

  return (
    <div key={user._id} className="bg-white shadow-md rounded-lg p-6">
      <div className="flex flex-col justify-between h-full">
        <div>
          <p className="text-lg font-semibold text-gray-700">Username: {user.username}</p>
          <p className="text-sm text-gray-500">Email: {user.email}</p>
          <p className="text-sm text-gray-500">Role: {user.role || 'N/A'}</p>
          <p className="text-sm text-gray-500">Password: {user.password}</p>
          <p className="text-sm text-gray-500">Log in Status : {user.isLoggedIn ? <span>Online</span>: <span>Offline</span>}</p>
          <p className="text-sm text-gray-500">
  Time of Log In: {user.loggedInAt ? new Date(user.loggedInAt).toLocaleString('en-GB', {
    timeZone: 'Asia/Kolkata',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  }) : 'N/A'}
</p>
          <p className="text-sm text-gray-500">
  Time of Log Out: {user.loggedOutAt ? new Date(user.loggedOutAt).toLocaleString('en-GB', {
    timeZone: 'Asia/Kolkata',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  }): 'N/A'}
</p>

          
          {/* <p className="text-sm text-gray-500">Employee is: { user.isPresent?.WFH || user.isPresent?.WFO ? <span>Working from  </span>: <span>Not Present</span>}</p> */}
          
          {/* {!user.isLoggedIn && user.isPresent ? (<p className="text-sm text-gray-500">Employee is: <span>Off duty</span></p>)
            :user.isLoggedIn && user.isPresent?.WFO? (<p className="text-sm text-gray-500">Employee is: <span>Working from Office</span></p>)
            :user.isPresent?.WFH ? (<p className="text-sm text-gray-500">Employee is: <span>Working from Home</span></p>)
            : (<p className="text-sm text-gray-500">Employee is: <span>On Leave</span></p>
            ) 
          }
           */}
            {
              user && !user.isLoggedIn && user.isPresent==='Leave' ? (<p className="text-sm text-gray-500">Employee is: <span>On Leave </span></p>)
              : (<p className="text-sm text-gray-500">Employee Work mode: {user.isPresent}</p>)
            }
           {/* <p className="text-sm text-gray-500">Employee is: <span>{user && user.isPresent}</span></p> */}

          <p className="text-sm text-gray-500">USER ID: {user.empId}</p>
          
          <p className="text-sm text-gray-500">Assigned Project: {userProject ? userProject.projectName : 'N/A'}</p>
          <p className="text-sm text-gray-500">Department: {user.department || 'N/A'}</p>
        </div>
        <button
          onClick={() => handleDeletion(user._id)}
          className="mt-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition duration-200"
        >
          Delete
        </button>
      </div>
    </div>
  );
})}

      </div>
    
      <CreateUsers/>
    </div>
    </>
  );
};

export default Users;