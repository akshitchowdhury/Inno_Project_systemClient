import React, { useEffect, useState } from 'react';

const ProjectManagement = () => {
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);
  const [toggleList, setToggleList] = useState(false);
  const [userToggleList, setUserToggleList] = useState(false);
const[taskName,setTaskName] = useState('')
const [givenProject, setGivenProject] = useState('')
const[userName,setUserName] = useState('')
  const fetchProjects = async () => {
    try {
      const response = await fetch('http://localhost:3000/projects/fetchProjects', {
        method: 'GET',
      });
      if (!response.ok) {
        throw new Error('Failed to fetch projects');
      }
      const data = await response.json();
      setProjects(data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:3000/users', {
        method: 'GET',
      });
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    fetchProjects();
    fetchUsers();
  }, []);

  const handleProjectCreation = async (e) => {
    e.preventDefault();
  
    // Client-side validation: Check if all necessary fields are filled
    if (!taskName.trim()) {
      alert('Please enter the task name');
      return;
    }
    
    if (!givenProject.trim()) {
      alert('Please select a project');
      return;
    }
    
    if (!userName.trim()) {
      alert('Please select a user');
      return;
    }
  
    const projectData = {
     employee: userName,
     email: 'user123@gmail.com',
     isLoggedIn: true,
     task: taskName,
     currentProject: givenProject   
    };
  
    console.log('Task Data:', projectData); // For debugging purposes
  
    try {
      // Example: Submitting data to the backend
      const response = await fetch('http://localhost:3000/taskBoards/addTask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(projectData),
      });
  
      if (!response.ok) {
        throw new Error('Failed to create task');
      }
  
      const data = await response.json();
      alert('Task successfully created!');
  
      // Optional: Reset the form after successful submission
      setTaskName('');
      setGivenProject('');
      setUserName('');
    } catch (error) {
      console.error('Error creating task:', error);
      alert('An error occurred while creating the task. Please try again.');
    }
  };
  
  return (
    <>
      {/* <TaskBoard /> */}

      <div className="flex flex-col lg:flex-row gap-6 p-6 bg-white shadow-lg rounded-md">
        {/* Task assignment input */}
        <form onSubmit={handleProjectCreation} className="w-full lg:w-1/2 flex flex-col gap-6">
          <div className="flex flex-col">
            <label className="text-gray-700 font-semibold mb-2" htmlFor="task">
              Task Assignment
            </label>
            <input
              type="text"
              id="task"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              placeholder="Enter task details"
              className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-600"
            />
          </div>

          {/* Projects list */}
          <div className="flex flex-col">
            <div
              className="cursor-pointer bg-gray-100 p-3 rounded-md text-gray-700 hover:bg-gray-200 transition-all"
              onClick={() => setToggleList(!toggleList)}
            >
              Projects Available
            </div>
            {toggleList && (
              <div className="mt-2 max-h-40 overflow-y-auto bg-white border border-gray-300 rounded-md p-2">
                {projects.map((project) => (
                  <div key={project._id} className="flex items-center gap-2 p-2">
                    <input type="checkbox" value={project.projectName}
                    onChange={(e) => setGivenProject(e.target.value)} className="h-4 w-4 text-amber-600" />
                    <p className="text-gray-600">{project.projectName}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Users list */}
          <div className="flex flex-col">
            <div
              className="cursor-pointer bg-gray-100 p-3 rounded-md text-gray-700 hover:bg-gray-200 transition-all"
              onClick={() => setUserToggleList(!userToggleList)}
            >
              Users Available
            </div>
            {userToggleList && (
              <div className="mt-2 max-h-40 overflow-y-auto bg-white border border-gray-300 rounded-md p-2">
                {users.map((user) => (
                  <div key={user._id} className="flex items-center gap-2 p-2">
                  <input type="checkbox" value={user.username}
                    onChange={(e) => setUserName(e.target.value)} className="h-4 w-4 text-amber-600" />
                    <p className="text-gray-600">{user.username}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Submit button */}
          <button
            type='submit'
            className="p-3 bg-amber-600 text-white rounded-md hover:bg-amber-700 transition-all w-full"
          >
            Create Task
          </button>
        </form>
      </div>
    </>
  );
};

export default ProjectManagement
