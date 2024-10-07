import React, { useEffect, useState } from 'react';

const CreateProjects = () => {
  const [projects, setProjects] = useState([]);
  const [projectName, setProjectName] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [projectDomain, setProjectDomain] = useState('');
  const [projectClient, setProjectClient] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const[userList,setUserList] = useState([])
  const[assignedUser,setAssignedUser] = useState('')
  const[toggleDropdown,setToggleDropdown] = useState(false)
  const fetchProjects = async () => {
    try {
      const response = await fetch('/projects/fetchProjects', {
        method: 'GET',
      });
      if (!response.ok) {
        throw new Error('Failed to fetch projects');
      }
      const data = await response.json();
      setProjects(data);
    } catch (error) {
      console.error('Error fetching projects:', error);
      setErrorMessage('Could not load projects. Please try again.');
    }
  };

  const fetchUsers = async()=>{
    const response = await fetch("/users", {
      method: "GET"
    })
    const data = await response.json()
    
    setUserList(data)
  }

  const handleSubmission = async (e) => {
    e.preventDefault();

    const projectData = {
      projectName: projectName,
      projectDescription: projectDescription,
      projectDomain: projectDescription,
      projectClient: projectClient,
      assignedTo: assignedUser
    };

    try {
      const response = await fetch('/projects/addProject', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(projectData),
      });

      if (!response.ok) {
        throw new Error('Failed to create project');
      }

      const result = await response.json();
      window.location.reload()
      alert('Project created successfully');
      setProjectName('');
      setProjectDescription('');
      setProjectDomain('');
      setProjectClient('')
      fetchProjects(); // Refresh the project list
    } catch (error) {
      console.error('Error creating project:', error);
      setErrorMessage('Failed to create project. Please check your input.');
    }
  };

  const handleDeletion = async(id)=> {
    try {
      const response = await fetch(`/projects/delProject/${id}`,
        {method: "DELETE"}
      )
      if(!response.ok){
        throw new Error('Failed to delete project');
      }
      setProjects(projects.filter((project)=> project._id!= id))
      
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  }


  useEffect(() => {
    fetchProjects();
    fetchUsers()
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-4xl font-bold text-center mb-10">Create New Project</h1>

      {errorMessage && (
        <p className="text-red-600 text-center mb-6">{errorMessage}</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {projects.length > 0 ? (
          projects.map((project, index) => (
            <div key={index} className="bg-white shadow-lg rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-2">{project.projectName}</h2>
              
              <p className="text-gray-600 mb-4">Assigned to: {project.assignedTo}</p>
              <h2 className="text-xl font-semibold mb-2">{project.projectClient}</h2>
              <p className="text-gray-600 mb-4">{project.projectDescription}</p>
              <p className="text-sm text-blue-500">Domain: {project.projectDomain}</p>
              <button onClick={()=>handleDeletion(project._id)} className='bg-red-700 p-4 rounded-md'>Delete Project</button>
            </div>
          ))
        ) : (
          <p className="text-center text-lg font-semibold text-gray-700">
            No projects found
          </p>
        )}
      </div>

      <div className="max-w-lg mx-auto bg-white shadow-md p-8 rounded-lg">
        <h2 className="text-2xl font-semibold text-center mb-6">Add New Project</h2>

        <form onSubmit={handleSubmission}>
          <div className="mb-4 flex flex-row gap-4">
          <div className='flex flex-col'>
            <label className="block text-gray-600 mb-2">Project Name</label>
            <input
              type="text"
              value={projectName}
              onChange={ e => setProjectName(e.target.value)}
              placeholder="New Project Name"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            </div>
            <div className='flex flex-col'>
            <label className="block text-gray-600 mb-2">Client Name</label>
            <input
              type="text"
              value={projectClient}
              onChange={(e) => setProjectClient(e.target.value)}
              placeholder="New Project Name"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            </div>
          </div>

          <div className="mb-4 flex flex-row gap-6">
          <div>
            <label className="block text-gray-600 mb-2">Project Domain</label>
            <input
              type="text"
              value={projectDomain}
              onChange={(e) => setProjectDomain(e.target.value)}
              placeholder="e.g. Web Development"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            </div>

            <div>
            <label onClick={()=>setToggleDropdown(!toggleDropdown)} className="cursor-pointer block text-gray-600 mb-2">Assign to</label>
            <div className='flex flex-row'>
            {
            toggleDropdown&&  userList.map((user,index)=>(
                <>
                 <div key={user._id}> 
            <input
              type="checkbox"  checked={user.username===assignedUser}
              value={user._id}
              onChange={()=>setAssignedUser(user.username)}
            /> <p>{user.username}</p>
               
               </div> </>
              ))
            }
            </div>
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-gray-600 mb-2">Project Description</label>
            <textarea
              value={projectDescription}
              onChange={(e) => setProjectDescription(e.target.value)}
              placeholder="Describe the project"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
          >
            Create Project
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateProjects;
