import React from 'react'
import { Link } from 'react-router-dom'
import Auth from './Employee/Authentication/Auth'

const Home = () => {
  return (
    <div className='flex flex-row gap-3'>
    <h1>Welcome Admin</h1>  
    <br/>
    {/* <Link to="/userlist" className='bg-green-500 p-4 rounded-md'>Check Users</Link>
    <Link to="/projectList" className='bg-green-500 p-4 rounded-md'>List of Projects</Link> */}

    {/* <Auth>Employees Log In Here</Auth> */}
        </div>
  )
}

export default Home

