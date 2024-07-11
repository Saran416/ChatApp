import { useEffect, useState, useContext } from 'react'
import './Chat.css'
import axios from 'axios'
import { UserContext } from '../context/userContext'

const Chat = () => {
  const [userslist,setUserslist] = useState([])
  const { user } = useContext(UserContext)
   
  useEffect(
    ()=>{axios.get('http://localhost:5000/api/users')
    .then((res)=>{
      setUserslist(res.data)
    })
    .catch((err)=>{
      console.log(err)
    })  
  },[])


  return (
    <div className='chat'>
      <div className="chat-left">
        <h2>Add Friends</h2>
        <br />
        {<ul className='chat-userlist'>
          {userslist.map((u)=>{
            if(user._id != u._id){
              return <li key={u._id} onClick={(e)=>{addfriend(e)}} id={u._id}>{u.name}</li>
            }
          })
          }
        </ul>}
        
        <h2>Your Friends</h2>
        <br />
      </div>
      <div className="chat-right">
          <div className="chat-right-bottom">
            <button>+</button>
            <form className='chat-right-form'>
              <input type="text" placeholder='Message' className='chat-right-message'/>
              <button type='submit' className='send' onClick={(e)=>{sendmessage(e)}}>&gt;</button>
            </form>
          </div>
      </div> 
    </div>
  )
}

export default Chat