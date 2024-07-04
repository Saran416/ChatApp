import Login from "./Pages/Login"
import Register from "./Pages/Register"
import Home from "./Pages/Home"
import Chat from "./Pages/Chat"
import {BrowserRouter,Routes, Route} from 'react-router-dom'


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home></Home>}>
        </Route>
        <Route path='/:id' element={<Chat></Chat>}>
        </Route>
        <Route path='/login' element={<Login></Login>}>
        </Route>
        <Route path='register' element={<Register></Register>}>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App