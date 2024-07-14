import Login from "./Pages/Login"
import Register from "./Pages/Register"
import Home from "./Pages/Home"
import {Routes, Route, Navigate} from 'react-router-dom'
import { UserContext } from "./context/userContext"
import { useContext } from "react"


const App = () => {
  const {user} = useContext(UserContext)
  return (
      <Routes>
        <Route path='/' element={user? <Home></Home>: <Login></Login>}>
        </Route>
        <Route path='/login' element={user? <Home></Home>: <Login></Login>}>
        </Route>
        <Route path='register' element={user? <Home></Home>: <Register></Register>}>
        </Route>
        <Route path='*' element={<Navigate to='/' />}>
        </Route>
      </Routes>
  )
}

export default App