import React, { useEffect, useState } from 'react';

const TaskBoard = () => {
    const [taskList, setTaskList] = useState([]);
    const [users, setUsers] = useState([]);

    const taskBoardData = async () => {
        const response = await fetch('/taskBoards/getTasks', {
            method: 'GET',
        });
        const data = await response.json();
        setTaskList(data);
    };

    const fetchUsers = async () => {
        const response = await fetch('/users', {
            method: 'GET',
        });
        const data = await response.json();
        setUsers(data);

    };

    useEffect(() => {
        taskBoardData();
        fetchUsers();
    }, [taskList]);

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`/taskBoards/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to delete the task');
            }

            setTaskList(taskList.filter((task) => task._id !== id));
            alert('Task Deleted Successfully');
            window.location.reload();
        } catch (error) {
            console.error('Error deleting task:', error.message);
            alert('Failed to delete the task. Please try again.');
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold text-center mb-6">Task Board: Tasks assigned for {new Date().toLocaleDateString("en-IN", {
                timeZone: "Asia/Kolkata",
                year: "numeric",
                month: "long",
                day: "numeric"
            })}</h1>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white shadow-md rounded-lg">
                    <thead>
                        <tr className="bg-gray-100 border-b">
                            <th className="py-3 px-6 text-left font-medium text-gray-700">S.No</th>
                            <th className="py-3 px-6 text-left font-medium text-gray-700">Employee</th>
                            <th className="py-3 px-6 text-left font-medium text-gray-700">Employee ID</th>
                            <th className="py-3 px-6 text-left font-medium text-gray-700">Department</th>
                            <th className="py-3 px-6 text-left font-medium text-gray-700">Employee Email</th>

                            <th className="py-3 px-6 text-left font-medium text-gray-700">Task Assigned</th>
                            <th className="py-3 px-6 text-left font-medium text-gray-700">Current Project</th>
                            <th className="py-3 px-6 text-left font-medium text-gray-700">Log In Status</th>
                            <th className="py-3 px-6 text-left font-medium text-gray-700">Work Mode</th>
                            <th className="py-3 px-6 text-left font-medium text-gray-700">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {taskList.map((task, index) => {
                            const user = users.find((user) => user.username === task.employee);
                            return (
                                <tr key={task._id} className="border-b hover:bg-gray-50 transition-colors">
                                    <td className="py-3 px-6">{index + 1}</td>
                                    <td className="py-3 px-6">{task.employee}</td>
                                    <td className="py-3 px-6">{user ? user.empId : 'N/A'}</td>
                                    <td className="py-3 px-6">{user ? user.department : 'N/A'}</td>
                                    <td className="py-3 px-6">{user ? user.email : 'N/A'}</td>

                                    <td className="py-3 px-6">{task.task}</td>
                                    <td className="py-3 px-6">{task.currentProject}</td>
                                    <td className="py-3 px-6">
                                        <span
                                            className={`px-3 py-1 rounded-full text-sm ${user && user.isLoggedIn ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                                                }`}
                                        >
                                            {user && user.isLoggedIn ? 'Online' : 'Offline'}
                                        </span>
                                    </td>
                                    <td className="py-3 px-6">
                                        <span
                                            className={`px-3 py-1 w-auto rounded-full text-sm ${user && user.isPresent ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                                                }`}
                                        >
                                            {user&& !user.isLoggedIn && user.isPresent
                                                ? 'Off duty'
                                                : (user && user.isLoggedIn && user.isPresent
                                                    ? 'WFO'
                                                    : 'On Leave'
                                                )
                                            }

                                        </span>
                                    </td>
                                    <td className="py-3 px-6">
                                        <button
                                            onClick={() => handleDelete(task._id)}
                                            className="text-red-600"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TaskBoard;
