import { useParams } from "react-router-dom"
import axios from "axios";
import  {useEffect} from 'react'
import Navbar from "../Components/Navbar";


const Chat = () => {
    const {id} = useParams();


    useEffect(()=>{
        axios.get(`http://localhost:5000/api/users/find/${id}`)
        .then((res)=>{
            console.log(res);
        })
        .catch(()=>{
            console.log("No such user exists");
        })
    },[])
    
    
    return (
        <>
            <Navbar isLoggedIn={true} ></Navbar>
            <div>Chat</div>
        </>
    );
}

export default Chat