import React from 'react'
import i1 from "../assets/aboutBg2.jpg"
import i2 from "../assets/homeBgif.gif"
import logo from "../assets/innoLogo2.jpeg"
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-6 flex items-center justify-between">
          <img src={logo} alt="Innomatrics Logo" className="h-12 w-auto" />
          <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
        </div>
      </header> */}

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <img src={i1} alt="About Background" className="w-full h-48 object-cover" />
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4">Welcome Admin</h2>
              <p className="text-gray-600">
                Manage your innovative solutions and cutting-edge technologies from this centralized admin dashboard. 
                Monitor performance, analyze data, and make informed decisions to drive your business forward.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <img src={i2} alt="Home Background" className="w-full h-48 object-cover" />
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
              <ul className="space-y-2">
              <Link to="/taskManage">
                <li>
                  <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
                    Daily Task Analytics
                  </button>
                </li>
                </Link>
                
                <li>
                <Link to="/projectList">
                  <button className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded">
                    Manage Projects
                  </button>
                  </Link>
                </li>
                <li>
                <Link to="/userlist">
                  <button className="w-full bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 px-4 rounded">
                    User Management
                  </button>
                  </Link>
                </li>
                
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
          <ul className="space-y-2">
            <li className="flex items-center justify-between border-b pb-2">
              <span className="text-gray-600">New project created: AI Integration</span>
              <span className="text-sm text-gray-400">2 hours ago</span>
            </li>
            <li className="flex items-center justify-between border-b pb-2">
              <span className="text-gray-600">User report generated: Q2 Performance</span>
              <span className="text-sm text-gray-400">Yesterday</span>
            </li>
            <li className="flex items-center justify-between">
              <span className="text-gray-600">System update completed: v2.3.1</span>
              <span className="text-sm text-gray-400">3 days ago</span>
            </li>
          </ul>
        </div>
      </main>

      <footer className="bg-gray-800 text-white mt-12">
        <div className="container mx-auto px-4 py-6 text-center">
          <p>&copy; 2024 Random Technologies. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default Home