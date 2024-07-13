import { useEffect, useState, useContext } from 'react'
import './Chat.css'
import axios from 'axios'
import { UserContext } from '../context/userContext'

const Chat = () => {
  const [userslist,setUserslist] = useState([])
  const [chatslist, setChatslist] = useState([])
  const [nameslist, setNameslist] = useState([])
  const [activechat, setActivechat] = useState('')
  const [message, setMessage] = useState('')
  const { user } = useContext(UserContext)
  const [messageslist,setMessageslist] = useState([])
  
  //Chats list portion

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
              if(nameslist[j].name==res.data.name){
                return 
              }
            }
            setNameslist(n=>[...n, {name: res.data.name, chatId: chatslist[i]._id}])
          }).catch((err)=>{
            console.log(err)
          })
        }
      }
  }
  },[chatslist])

  const check = (name)=>{
    for(let i=0;i<nameslist.length;i++){
      if(name == nameslist[i].name){
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
      setMessage('')
      setChatslist(c=>[...c, res.data])
    })
  }

  // Messages portion
  const openmessages = (e)=>{
    if(e){
      setActivechat(e.target.id)
    }
    axios.get(`http://localhost:5000/api/messages/${activechat || e.target.id}`).then((res)=>{
      setMessageslist(res.data)
    }).catch((err)=>{
      console.log(err)
    })
  }

  const sendmessage = (e)=>{
    console.log(activechat)
    e.preventDefault()
    axios.post('http://localhost:5000/api/messages',
        {
          chatId: activechat,
          senderId: user._id,
          text: message,
    }).then(()=>{
      console.log("message sent")
      openmessages(null)
    }).catch((err)=>{
      console.log(err)
    })
  }

  useEffect(()=>{
    console.log(messageslist)
  },[messageslist])

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
          {nameslist.map((u)=>{
              return <li key={u.chatId} onClick={(e)=>openmessages(e)} id={u.chatId}>{u.name}</li> 
          })
          }
        </ul>
      </div>
      <div className="chat-right">
          <div className="chat-right-bottom">
            <button>+</button>
            <form className='chat-right-form'>
              <input type="text" value={message} placeholder='Message' className='chat-right-message' onChange={e=>{setMessage(e.target.value)}}/>
              <button type='submit' className='send' onClick={(e)=>{sendmessage(e)} }>&gt;</button>
            </form>
          </div>
          {!(activechat=='') && 
          <div className='messages'>
            {
              messageslist.map(i=>{
                if(i.senderId==user._id){
                  return <div className="me"><p>{i.text}</p></div>
                }
                else{
                  return <div className="friend"><p>{i.text}</p></div>
                }
              })
            }
          </div>}
      </div> 
    </div>
  )
}

export default Chat