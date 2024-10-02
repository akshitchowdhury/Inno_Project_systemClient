import React, { useEffect, useState } from 'react'

const AuthTest = () => {
    const [users,setUsers] = useState([])
    const[email,setEmail] = useState("")
    const[password,setPassword] = useState("")
    const getUsers = async()=>{

        const response = await fetch("http://localhost:3000/users",{method: "GET"})

        const data = await response.json();

        setUsers(data)
        console.log(data)
    }


    useEffect(()=>{
        	
        getUsers()
    },[])
  return (
    <div>
      <form onSubmit={(e)=>{
            e.preventDefault();
            const user = users.find((user) => user.email === email);
            if (user && user.password === password) {
      alert(`Welcome ${user._id}; you have logged in`);
    } else {
      alert("Login failed");
    }
      }}>
        <input className='p-4 border border-l-zinc-950' placeholder='type email' type='email' value={email} onChange={(e)=>setEmail(e.target.value)}/>
        <input className='p-4 border border-l-zinc-950' placeholder='type password' type='password'  value={password} onChange={(e)=>setPassword(e.target.value)}/>
        <button  type='submit'>Log In </button>
      </form>
    </div>
  )
}

export default AuthTest

