import React, { useState } from 'react';

const CreateUsers = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [department, setDepartment] = useState('');
  
  // const [project, setProject] = useState('');
  // const [projectDescription, setProjectDescription] = useState('');
  const [error, setError] = useState('');
  // const WFO = true;
  // const WFH = false;
  // const Leave = false;
  const handleSubmission = (e) => {
    e.preventDefault();
  
    if (!username || !email || !password || !department) {
      setError('All fields are required');
      return;
    }
  
    // const user = {
    //   username : username,
    //   email : email,
    //   password: password,
    //   projectName : project,
    //   projectDescription : projectDescription
    // }
    
    const empId = `INNO${Math.floor(1000+Math.random()*90)}` 
    // const isPresent = {WFO , WFH, Leave};
    const isPresent = 'Off Duty'
    const user = {
      username : username,
      email : email,
      password: password,
      department: department,
      empId: empId,
      isPresent: isPresent
    }
    const submitData = async () => {
      try {
        const data = await fetch('/users/addUsers', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json', 
          },
          body: JSON.stringify(user),

        });
  
        if (!data.ok) {
          throw new Error('Failed to create user');
        }
  
        const response = await data.json();
        alert('User created successfully');
        window.location.reload();
      } catch (error) {
        setError('Error creating user. Please try again.');
      }
    };
  
    submitData();
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-700 text-center mb-6">Create New User</h2>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmission}>
          <div className="mb-4">
            <label className="block text-gray-600 mb-2">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="New username"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-600 mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="New email"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-600 mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="New password"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-600 mb-2">Department</label>
            <input
              type="text"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              placeholder="New Department"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateUsers;
