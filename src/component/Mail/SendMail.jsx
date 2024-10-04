import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SendMail = () => {
    const [message, setMessage] = useState('');
    const [users, setUsers] = useState([]);
    const [chosenUser, setChosenUser] = useState(null);
    const [error, setError] = useState(null); // Error state for handling fetch errors
    const [success, setSuccess] = useState(null); // State to handle success messages
    
    const navigate =useNavigate()
    const fetchUsers = async () => {
        try {
            const response = await fetch('/users', {
                method: 'GET',
            });

            if (!response.ok) {
                throw new Error('Failed to fetch users');
            }

            const data = await response.json();
            setUsers(data);
        } catch (error) {
            console.error('Error fetching users:', error);
            setError(error.message); // Set error message
        }
    };

    const handleSubmission = async (e) => {
        e.preventDefault();

        const selectedUser = users.find((user) => user.username === chosenUser);
        if (!selectedUser) {
            setError('User not found');
            return;
        }
        
        
        const data = { 
           username: chosenUser,message: message };

        try {
            const sendData = await fetch('/messages/sendMessage', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!sendData.ok) {
                throw new Error('Failed to send message');
            }

            const response = await sendData.json();
            setSuccess(`Message sent successfully to ${chosenUser}!`);
             // Set success message
            alert(`Message sent successfully!`); // Set success message
            setMessage('');
            setChosenUser(null);
            setError(null);
            navigate('/sendMail'); // Clear error if submission is successful
        } catch (error) {
            console.error('Error sending message:', error);
            setError(error.message); // Set error message
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []); // Add dependency array to prevent continuous fetching

    return (
        <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md mt-10">
            <h2 className="text-lg font-semibold text-center mb-4">Send a Message</h2>
            {error && <div className="text-red-500 mb-4">{error}</div>} {/* Display error messages */}
            {success && <div className="text-green-500 mb-4">{success}</div>} {/* Display success messages */}
            <form onSubmit={handleSubmission} className='flex flex-col gap-4'>
                <div className="font-medium">Select Recipient:</div>
                {
                    users.map((user) => (
                        <div key={user._id} className="flex items-center">
                            <input 
                                type='checkbox' 
                                checked={user.username === chosenUser}
                                value={user._id} 
                                onChange={() => setChosenUser(user.username)} 
                                className="mr-2"
                            />
                            <label>{user.username}</label>
                        </div>
                    ))
                }

                <textarea 
                    className='p-4 border-2 border-gray-600 rounded-md resize-none' 
                    rows="4"
                    placeholder='Enter your message' 
                    onChange={(e) => setMessage(e.target.value)} 
                    value={message} // Controlled component
                />
                <button 
                    type='submit' 
                    className='p-4 bg-green-600 rounded-md text-white hover:bg-green-700 transition duration-200'
                >
                    Send Message
                </button>
            </form>
        </div>
    );
};

export default SendMail;
