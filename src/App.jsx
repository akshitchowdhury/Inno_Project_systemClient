
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Users from './component/Users'
import CreateUsers from './component/CreateUsers/CreateUsers'
import AuthTest from './component/AuthTest/AuthTest'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from './component/Home'
import CreateProjects from './component/Projects/CreateProjects'
import Nav from './component/NavBar/Nav'
import ProjectManagement from './component/ProjectManagement/ProjectManagement'
import TaskPage from './component/ProjectManagement/TaskPage'
import SendMail from './component/Mail/SendMail'
import ReceiveMail from './component/Mail/ReceiveMail'
function App() {

  return (
<>
<Router>
<Nav/>
  <Routes>
  
    <Route path='/' element={<Home/>}/>
    <Route path='/userlist' element={<Users/>}/>
    <Route path='/taskManage' element={<TaskPage/>}/>
    <Route path='/sendMail' element={<SendMail/>}/>
    <Route path='/receiveMail' element={<ReceiveMail/>}/>
    <Route path='/projectList' element={<CreateProjects/>}/>

  </Routes>
</Router>

{/* <AuthTest/> */}
</>
  )
}

export default App
