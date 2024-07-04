import './Navbar.css'

import {Link} from 'react-router-dom'

const Navbar = (props) => {
    return (
        <div className="navbar">
            <Link className='links'to='/'><h1>ChatApp</h1></Link>
            {!props.isLoggedIn ?
            <div className="right">
                <h2><Link to='/login' className='links'>Login</Link></h2>
                <h2><Link to='/register' className='links'>Register</Link></h2>
            </div> :
            <div className="right">
                <h5>Logged in as {}</h5>
                <h2><Link to='/' className='links'>Logout</Link></h2>
            </div>
            }
        </div>
  )
}

export default Navbar