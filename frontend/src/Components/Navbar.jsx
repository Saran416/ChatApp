import { useContext } from 'react'
import { UserContext } from '../context/userContext'
import './Navbar.css'

import {Link} from 'react-router-dom'

const Navbar = () => {
    const {user, updateUserInfo} = useContext(UserContext)

    const logout = ()=>{
        localStorage.removeItem("User")
        updateUserInfo(null)

    }
    
    return (
        <div className="navbar">
            <Link className='links'to='/'><h1>ChatApp</h1></Link>
            {
                user?
                <div className='right'>
                    <h4>Logged in as {user.name}</h4>
                    <h4><Link to='/login' className='links' onClick={logout}>Logout</Link></h4>
                </div>
                :
                <div className="right">
                <h2><Link to='/login' className='links'>Login</Link></h2>
                <h2><Link to='/register' className='links'>Register</Link></h2>
            </div>
            }
            
        </div>
  )
}

export default Navbar