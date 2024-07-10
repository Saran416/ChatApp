import { useEffect, useState } from 'react'
import './Chat.css'
import axios from 'axios'

const Chat = () => {
  const [userslist,setUserslist] = useState()
   
  useEffect(
    ()=>{axios.get('http://localhost:5000/api/users')
    .then((res)=>{
      setUserslist(res.data)
    })
    .catch((err)=>{
      console.log(err)
    })
  },[])

  const sendmessage = (e)=>{
    e.preventDefault();
  }

  return (
    <div className='chat'>
      <div className="chat-left">
        {userslist && <ul className='chat-userlist'>
          {userslist.map((user)=>
            <li key={user._id}>{user.name}</li>
          )}
        </ul>}
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