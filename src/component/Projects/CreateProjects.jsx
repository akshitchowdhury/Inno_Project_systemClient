import React, { useEffect, useState } from 'react';

const CreateProjects = () => {
  const [projects, setProjects] = useState([]);
  const [projectName, setProjectName] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [projectDomain, setProjectDomain] = useState('');
  const [projectClient, setProjectClient] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [userList, setUserList] = useState([]);
  const [assignedUser, setAssignedUser] = useState('');
  const [toggleDropdown, setToggleDropdown] = useState(false);

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

  const fetchUsers = async () => {
    const response = await fetch("/users", {
      method: "GET"
    });
    const data = await response.json();
    setUserList(data);
  };

  const handleSubmission = async (e) => {
    e.preventDefault();

    const projectData = {
      projectName,
      projectDescription,
      projectDomain,
      projectClient,
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
      window.location.reload();
      alert('Project created successfully');
      setProjectName('');
      setProjectDescription('');
      setProjectDomain('');
      setProjectClient('');
      fetchProjects();
    } catch (error) {
      console.error('Error creating project:', error);
      setErrorMessage('Failed to create project. Please check your input.');
    }
  };

  const handleDeletion = async (id) => {
    try {
      const response = await fetch(`/projects/delProject/${id}`, { method: "DELETE" });
      if (!response.ok) {
        throw new Error('Failed to delete project');
      }
      setProjects(projects.filter((project) => project._id !== id));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  useEffect(() => {
    fetchProjects();
    fetchUsers();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-4xl font-bold text-center mb-10">Create New Project</h1>

      {errorMessage && <p className="text-red-600 text-center mb-6">{errorMessage}</p>}

      <div className="overflow-x-auto mb-10">
        {projects.length > 0 ? (
          <table className="min-w-full bg-white shadow-lg rounded-lg">
            <thead>
              <tr className="bg-blue-500 text-white">
                <th className="py-2 px-4">#</th>
                <th className="py-2 px-4">Project Name</th>
                <th className="py-2 px-4">Client</th>
                <th className="py-2 px-4">Assigned To</th>
                <th className="py-2 px-4">Domain</th>
                <th className="py-2 px-4">Description</th>
                <th className="py-2 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project, index) => (
                <tr key={project._id} className="text-gray-700">
                  <td className="py-2 px-4 text-center">{index + 1}</td>
                  <td className="py-2 px-4">{project.projectName}</td>
                  <td className="py-2 px-4">{project.projectClient}</td>
                  <td className="py-2 px-4">{project.assignedTo}</td>
                  <td className="py-2 px-4">{project.projectDomain}</td>
                  <td className="py-2 px-4">{project.projectDescription}</td>
                  <td className="py-2 px-4 text-center">
                    <button onClick={() => handleDeletion(project._id)} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-center text-lg font-semibold text-gray-700">No projects found</p>
        )}
      </div>

      <div className="max-w-lg mx-auto bg-white shadow-md p-8 rounded-lg">
        <h2 className="text-2xl font-semibold text-center mb-6">Add New Project</h2>

        <form onSubmit={handleSubmission}>
          <div className="mb-4 flex flex-row gap-4">
            <div className="flex flex-col w-1/2">
              <label className="block text-gray-600 mb-2">Project Name</label>
              <input
                type="text"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                placeholder="New Project Name"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="flex flex-col w-1/2">
              <label className="block text-gray-600 mb-2">Client Name</label>
              <input
                type="text"
                value={projectClient}
                onChange={(e) => setProjectClient(e.target.value)}
                placeholder="Client Name"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          <div className="mb-4 flex flex-row gap-4">
            <div className="w-1/2">
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
            <div className="w-1/2 relative">
              <label className="block text-gray-600 mb-2">Assign To</label>
              <button
                type="button"
                onClick={() => setToggleDropdown(!toggleDropdown)}
                className="w-full bg-blue-500 text-white py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-blue-600 transition"
              >
                {assignedUser || "Select User"}
              </button>
              {toggleDropdown && (
                <div className="absolute bg-white shadow-lg mt-2 rounded w-full z-10 max-h-40 overflow-y-auto">
                  {userList.map((user) => (
                    <div
                      key={user._id}
                      className="px-4 py-2 cursor-pointer hover:bg-gray-200"
                      onClick={() => {
                        setAssignedUser(user.username);
                        setToggleDropdown(false);
                      }}
                    >
                      {user.username}
                    </div>
                  ))}
                </div>
              )}
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
