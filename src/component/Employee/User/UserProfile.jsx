// import React, { useEffect, useState } from 'react'

// const UserProfile = ({users, email, isAuth, password}) => {
//     const[userList,setUsers] = useState([])

//     const fetchUsers = async () => {
//         try {
//           const response = await fetch('http://localhost:3000/users', {
//             method: 'GET',
//           });
    
//           if (!response.ok) {
//             throw new Error('Failed to fetch users');
//           }
    
//           const data = await response.json();
//           setUsers(data);
//         } catch (error) {
//           console.error('Error fetching users:', error);
//         }
//       };
    
//       useEffect(()=>{
//         fetchUsers()
//       },[users])
    
//   return (
//     <>
    
//     <div className='flex flex-col text-4xl'>
//     <h1>User Profile</h1>
//     {
//         users.slice(0,1).map((user,index)=>{
//             const verifiedUser = userList.find((user) => user.email === email && user.password === password);
//             return(
//             <>
            
//             <h3>Welcome { verifiedUser.username }</h3>
//             <p>Email: {verifiedUser ? verifiedUser.email : ''}</p>
            
//             <p>Dept: {verifiedUser ? verifiedUser.department : ''}</p>
//             <p>Logged In: {isAuth===true ? 'true' : 'false'}</p>
            
//             </>
//             )
//     })
    
//     }
//     </div>
//     </>
//   )
// }

// export default UserProfile


import React, { useEffect, useState } from 'react';

const UserProfile = ({ users, email, isAuth, password }) => {
    const [userList, setUserList] = useState([]);

    const fetchUsers = async () => {
        try {
            const response = await fetch('http://localhost:3000/users', { method: 'GET' });
            if (!response.ok) throw new Error('Failed to fetch users');
            const data = await response.json();
            setUserList(data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    useEffect(() => {
        // Only fetch the user list if it's not already passed from props
        if (!users || users.length === 0) {
            fetchUsers();
        } else {
            setUserList(users); // Use the prop directly
        }
    }, [users]);

    const verifiedUser = userList.find((user) => user.email === email && user.password === password);

    return (
        <div className="flex flex-col text-4xl">
            <h1>User Profile</h1>
            {verifiedUser ? (
                <>
                    <h3>Welcome {verifiedUser.username}</h3>
                    <p>Email: {verifiedUser.email}</p>
                    <p>Dept: {verifiedUser.department}</p>
                    <p>Logged In: {isAuth === true ? 'true' : 'false'}</p>
                </>
            ) : (
                <p>No user found or not logged in</p>
            )}
        </div>
    );
};

export default UserProfile;
