import { useEffect, useState, useContext } from 'react'
import './Chat.css'
import axios from 'axios'
import { UserContext } from '../context/userContext'

const Chat = () => {
  const [userslist,setUserslist] = useState([])
  const [chatslist, setChatslist] = useState([])
  const [nameslist, setNameslist] = useState([])
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

  useEffect(
    ()=>{axios.get(`http://localhost:5000/api/chats/${user._id}`)
    .then((res)=>{
      setChatslist(res.data)
    })
    .catch((err)=>{
      console.log(err)
    })  
  },[])

  useEffect(()=>{
    for(let i=0;i<chatslist.length;i++){
      for(let j=0;j<2;j++){
        if(chatslist[i].members[j]!= user._id){
          axios.get(`http://localhost:5000/api/users/find/${chatslist[i].members[j]}`).then((res)=>{
            for(let j=0;j<nameslist.length;j++){
              if(nameslist[j]==res.data.name){
                return 
              }
            }
            setNameslist(n=>[...n, res.data.name])
          }).catch((err)=>{
            console.log(err)
          })
        }
      }
  }
  },[chatslist])

  const check = (name)=>{
    for(let i=0;i<nameslist.length;i++){
      if(name == nameslist[i]){
        return false
      }
    }
    return true
  }


  const addfriend = (e)=>{
    axios.post('http://localhost:5000/api/chats',{
      firstId: user._id,
      secondId: e.target.id
    }).then((res)=>{
      setChatslist(c=>[...c, res.data])
    })
  }

  return (
    <div className='chat'>
      <div className="chat-left">
        <h3>Add Friends</h3>
        <br />
        <ul className='chat-userlist'>
          {userslist.map((u)=>{
            if(user._id != u._id && check(u.name)){
              return <li key={u._id} onClick={(e)=>{addfriend(e)}} id={u._id}>{u.name}</li>
            }
          })
          }
        </ul>
        
        <h3>Your Friends</h3>
        <br />
        <ul className='chat-userlist'>
          {nameslist.map((u,index)=>{
              return <li key={index}>{u}</li> 
          })
          }
        </ul>
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