import { useEffect, useState, useContext, act } from 'react'
import './Chat.css'
import axios from 'axios'
import { UserContext } from '../context/userContext'
import {io} from 'socket.io-client'
import sendimg from '../assets/send.png'


const Chat = () => {
  const { user } = useContext(UserContext)
  const [userslist,setUserslist] = useState([])
  const [chatslist, setChatslist] = useState([])
  const [nameslist, setNameslist] = useState([])
  const [activechat, setActivechat] = useState('')
  const [message, setMessage] = useState('')
  const [messageslist,setMessageslist] = useState([])
  const [socket, setSocket] = useState(null)
  const [newMessage, setNewMessage] = useState('')
  const [activeChatName, setActiveChatName] = useState('')
  
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
        if(chatslist[i].members[j] != user._id){
          axios.get(`http://localhost:5000/api/users/find/${chatslist[i].members[j]}`).then((res)=>{
            for(let j=0;j<nameslist.length;j++){
              if(nameslist[j].name==res.data.name){
                return 
              }
            }
            setNameslist(n=>[...n, {name: res.data.name, chatId: chatslist[i]._id, userId: res.data._id}])
          }).catch((err)=>{
            console.log(err)
          })
        }
      }
  }
  },[chatslist])

  
  const addfriend = (e)=>{
    axios.post('http://localhost:5000/api/chats',{
      firstId: user._id,
      secondId: e.target.id
    }).then((res)=>{
      setChatslist(c=>[...c, res.data])
    })
  }
  
  // Messages portion
  const openmessages = (e)=>{
    if(e != null){
      setActivechat(e.target.id)
      axios.get(`http://localhost:5000/api/messages/${e.target.id}`).then((res)=>{
        setMessageslist(res.data)
      }).catch((err)=>{
        console.log(err)
      })
    }
    else{
      axios.get(`http://localhost:5000/api/messages/${activechat}`).then((res)=>{
        setMessageslist(res.data)
      }).catch((err)=>{
        console.log(err)
      })
    }
  }

  const sendmessage = (e)=>{
    e.preventDefault()
    if(message=='') return
    axios.post('http://localhost:5000/api/messages',
      {
        chatId: activechat,
        senderId: user._id,
        text: message,
      }).then((res)=>{
        setMessage('')
        setNewMessage(res.data)
        // openmessages(null)
        
      }).catch((err)=>{
        console.log(err)
      })
  }
    
  useEffect(()=>{
    const newSocket = io('http://localhost:5000');
    setSocket(newSocket)
    return ()=>{
      if(socket==null) return
      socket.disconnect()
    }
  },[user])

  //send message
  useEffect(()=>{
    if(socket==null) return;
    socket.emit('sendMessage', newMessage)
    },[newMessage]);
          
  //recieve message
  useEffect(()=>{
    if(socket==null) return;
    socket.on("getMessage", (res)=>{
      let messageslength = messageslist.length
      if(messageslength==0){
        // console.log([...messageslist, res])
        setMessageslist((prev)=>[...prev, res]);
      }
      else if(res.chatId != messageslist[messageslength-1].chatId){
        // console.log([...messageslist, res])
        setMessageslist((prev)=>[...prev, res])
      }
    })
  return ()=>{
    if(socket==null) return
    socket.off('getMessage')
  }
  }, [activechat, socket])
  
  const check = (name)=>{
    for(let i=0;i<nameslist.length;i++){
      if(name == nameslist[i].name){
        return false
      }
    }
    return true
  }
  
  useEffect(()=>{
    for(let i=0;i<nameslist.length;i++){
      if(nameslist[i].chatId == activechat){
        setActiveChatName(nameslist[i].name)
      }
    }
  },[activechat])
  

  return (
      <div className='chat'>
      <div className="chat-left">
        <h3>Add Friends</h3>
        <br />
        <div className='chat-userlist'>
          {userslist.map((u)=>{
            if(user._id != u._id && check(u.name)){
              return <button key={u._id} onClick={(e)=>{addfriend(e)}} id={u._id} name={u.name}>{u.name}</button>
            }
          })
        }
        </div>
        
        <h3>Your Friends</h3>
        <br />
        <div className='chat-userlist'>
          {nameslist.map((u)=>{
            return <button key={u.chatId} onClick={(e)=>openmessages(e)} id={u.chatId}>{u.name}</button>  
          })
          }
        </div>
      </div>


      <div className="chat-right">
          <div className="chat-right-bottom">
            <form className='chat-right-form' onSubmit={(e)=>{sendmessage(e)}}>
              <input type="text" value={message} placeholder='Message' className='chat-right-message' onChange={e=>{setMessage(e.target.value.trimStart())}}/>
              <button type='submit' className='send'><img src={sendimg} alt=">" /></button>
            </form>
          </div>
          {!(activechat=='') && 
          <div className='messages'>
            {
              messageslist.map(i=>{
                if(i.senderId==user._id){
                  return <div className="me" key={i._id}><span>{i.text}</span></div>
                }
                else{
                  return <div className="friend" key={i._id}><span>{i.text}</span></div>
                }
              })
            }
          </div>}

          <div className="chat-name">
            {
              activeChatName? <p>{activeChatName}</p> : <p></p>
            }
          </div>
      </div> 
    </div>
  )
}

export default Chat