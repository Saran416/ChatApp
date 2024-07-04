import axios from "axios"
import { useNavigate } from "react-router-dom"
import Navbar from "../Components/Navbar"
import { useState } from "react"

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordView,setPasswordView] = useState('password')
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const onLogin = ()=>{
    const user = {
      email,
      password
    }

    axios.post('http://localhost:5000/api/users/login',user).then((res)=>{
      console.log(res.data)
      navigate(`/${res.data._id}`)
    }).catch((err)=>{
      console.log("Error while logging in: ", err.response.data)
      setError(err.response.data)
    })
  }

  return (
    <div>
      <Navbar></Navbar>
      <div className="form">
        <div className="input">
        <label>Mail</label>
        <input type="text" value={email} onChange={e=>setEmail(e.target.value)} required/>
        </div>
        <div className="input">
        <label>Password</label>
        <input type={passwordView} value={password} onChange={e=>setPassword(e.target.value)} required/>
        </div>
        <div className="viewpwd">
          <input type="checkbox" className="checkbox" onChange={(e)=>{
            if(e.target.value=="password"){
              setPasswordView("text")
            }
            else{
              setPasswordView("password")
            }
          }} value={passwordView}/>
          <label >view password</label>
        </div>
        <button onClick={onLogin}>Login</button>
        {<p className="error">{error}</p>}
      </div>
    </div>
  )
}

export default Login