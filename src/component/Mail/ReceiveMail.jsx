import React, { useEffect, useState } from 'react';

const ReceiveMail = () => {
    const [mails, setMails] = useState([]);

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
                                        {/* Add any actions here, e.g., Reply, Delete */}
                                        <button className="text-blue-500 hover:underline">Reply</button>
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
