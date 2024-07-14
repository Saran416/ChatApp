import axios from "axios"
import Navbar from "../Components/Navbar"
import { useContext, useState } from "react"
import { UserContext } from "../context/userContext"

const Login = () => {
  const {updateUserInfo} = useContext(UserContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordView,setPasswordView] = useState('password');
  const [error, setError] = useState("");

  const onLogin = (e)=>{
    e.preventDefault();
    const user = {
      email,
      password
    };

    axios.post('http://localhost:5000/api/users/login',user).then((res)=>{
      updateUserInfo(res.data)
      localStorage.setItem("User", JSON.stringify(res.data))
    }).catch((err)=>{
      console.log("Error while logging in: ", err.response.data)
      setError(err.response.data)
    });
  }

  return (
    <div>
      <Navbar></Navbar>
        <form onSubmit={(e)=>{onLogin(e)}} className="form">
          <div className="input-container">
            <input type="text" value={email} onChange={e=>setEmail(e.target.value.trim())} placeholder="Mail" required className="input"/>
          </div>
          <div className="input-container">
            <input type={passwordView} value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" required className="input"/>
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
          <button type='submit'>Login</button>
          {<p className="error">{error}</p>}
        </form>
        
    </div>
  )
}

export default Login