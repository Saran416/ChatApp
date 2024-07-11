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
                <>
                    <div className="center">
                        <h4>Logged in as {user.name}</h4>
                    </div>
                    <div className='right'>
                        <h3 className='logout'><Link to='/login' className='links' onClick={logout}>Logout</Link></h3>
                    </div>
                </>
                :
                <div className="right">
                <h3><Link to='/login' className='links'>Login</Link></h3>
                <h3><Link to='/register' className='links'>Register</Link></h3>
            </div>
            }
            
        </div>
  )
}

export default Navbar