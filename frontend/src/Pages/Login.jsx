import axios from "axios"
import Navbar from "../Components/Navbar"
import { useContext, useState } from "react"
import { UserContext } from "../context/userContext"

const Login = () => {
  const {updateUserInfo} = useContext(UserContext)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordView,setPasswordView] = useState('password')
  const [error, setError] = useState("")

  const onLogin = ()=>{
    const user = {
      email,
      password
    }

    axios.post('http://localhost:5000/api/users/login',user).then((res)=>{
      console.log(res.data)
      updateUserInfo(res.data)
      localStorage.setItem("User", JSON.stringify(res.data))
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