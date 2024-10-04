import React, { useEffect, useState } from 'react';

const ReceiveMail = () => {
    const [mails, setMails] = useState([]);
    const [replyIndex, setReplyIndex] = useState(null); // Track which reply box is opened
    const [reply, setReply] = useState('');

    const fetchEmail = async () => {
        try {
            const response = await fetch('/messages/getMessages', {
                method: 'GET',
            });

            if (!response.ok) {
                throw new Error('Failed to fetch emails');
            }

            const data = await response.json();
            setMails(data);
        } catch (error) {
            console.error('Error fetching emails:', error);
        }
    };

    const handleDelete = async () => {
        try {
            const response = await fetch('/messages/deleteAll', {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Failed to delete emails');
            }

            setMails([]); // Clear mails after deletion
            alert('All messages deleted successfully');
        } catch (error) {
            console.error('Error deleting emails:', error);
        }
    };

    const handleReply = async (mail) => {
        // Send reply if the reply text is not empty
        if (reply.trim() === '') return;
        const username = mail.receiver_username
        const replyData = {
            sender_email: 'parameshp@innotech.co',
           receiver_username: username,
           messages: [reply],
        };
        try {
            const response = await fetch('/messages/sendMessage', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(replyData),
            });

            if (!response.ok) {
                throw new Error('Failed to reply');
            }
            const data = await response.json();
            alert('Message sent successfully');
            setReply(''); // Clear the reply input after sending
            setReplyIndex(null); // Close the reply box
        } catch (error) {
            console.error('Error replying:', error);
        }
    };

    const handleDeleteOne = async (id) => {
        try {
            const response = await fetch(`/messages/${id}`, {
                method: 'DELETE',
            });
    
            // Check for response status before parsing JSON
            if (!response.ok) {
                throw new Error('Failed to delete email');
            }
    
            const data = await response.json(); // Parse JSON after checking response
    
            // Only update mails if the response is successful
            setMails((prevMails) => prevMails.filter((mail) => mail._id !== id));
            
            // Alert after the state update
            alert('Message deleted successfully');
        } catch (error) {
            console.error('Error deleting email:', error);
            alert('Error deleting email: ' + error.message); // Optional: Show error message to user
        }
    };
    

    useEffect(() => {
        fetchEmail();
    }, []);

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">Inbox</h1>
            <button
                className="bg-red-500 text-white px-4 py-2 rounded-md mb-4"
                onClick={handleDelete}
            >
                Delete All Messages
            </button>
            {mails.length > 0 ? (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-200">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="py-2 px-4 border-b">Sender</th>
                                <th className="py-2 px-4 border-b">Receiver</th>
                                <th className="py-2 px-4 border-b">Message</th>
                                <th className="py-2 px-4 border-b">Actions</th>
                                <th className="py-2 px-4 border-b"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {mails.map((mail, index) => (
                                <tr key={index} className="hover:bg-gray-50">
                                    <td className="py-2 px-4 border-b">{mail.sender_email}</td>
                                    <td className="py-2 px-4 border-b">{mail.receiver_username}</td>
                                    <td className="py-2 px-4 border-b">
                                        {mail.messages.length > 0 ? mail.messages[0] : "No message"}
                                    </td>
                                    <td className="py-2 px-4 border-b">
                                        <button
                                            onClick={() => setReplyIndex(replyIndex === index ? null : index)}
                                            className="text-blue-500 hover:underline"
                                        >
                                            Reply
                                        </button>
                                        {replyIndex === index && (
                                            <div>
                                                <textarea
                                                    value={reply}
                                                    onChange={(e) => setReply(e.target.value)}
                                                    className="border border-gray-300 p-2 mt-2 w-full"
                                                    placeholder="Enter your reply here"
                                                ></textarea>
                                                <button
                                                    onClick={() => handleReply(mail)}
                                                    className="bg-blue-500 text-white px-4 py-2 mt-2 rounded-md"
                                                >
                                                    Send Reply
                                                </button>
                                            </div>
                                        )}
                                    </td>
                                    <td>
                                        <button onClick={()=>handleDeleteOne(mail._id)}>
                                            Delete Message
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p className="mt-4">No new mails</p>
            )}
        </div>
    );
};

export default ReceiveMail;
