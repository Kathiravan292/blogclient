import { Route, Routes } from 'react-router-dom'

import Home from "./Home.jsx"
import Single from "./Single.jsx"
import Register from './Register.jsx'
import Login from './Login.jsx'
import Creatblog from './Creatblog.jsx'
import Editblog from './Editblog.jsx'
import Getblogtopic from './Getblogtopic.jsx'
import { ROLE } from '../util/config.js' 
import User from "./User.jsx"
import DeleteUser from './DeleteUser.jsx'


const Routing = () => {
  return (
    <Routes>

      <Route path='/' element={<Home />} />
      <Route path='/getsingleblog/:id' element={<Single></Single>} />
      <Route path='/register' element={<Register />} />
      <Route path='/login' element={<Login />} />
      <Route path='/Createblog' element={<Creatblog />} />
      <Route path='/editblog/:id' element={<Editblog />} />
       <Route path='/getblogbytopic/:topic' element={<Getblogtopic />} />
        {
          ROLE === "admin" &&
          <>
            <Route path='/users' element={<User />}/>
            <Route path='/deleteuser/:id' element={<DeleteUser />}/>
          </>
        }
        <Route path='/*' element={<h2>Page Not Found</h2>}/>
      </Routes>
  )
}


  
  

export default Routing