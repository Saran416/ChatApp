import { createContext, useCallback, useEffect, useState } from "react";

export const UserContext = createContext()

export const UserContextProvider = ({children})=>{
    const [user,setUser] = useState(null);

    useEffect(()=>{
        const temp = localStorage.getItem('User')
        if(temp){
            // console.log('User Data', JSON.parse(temp))
            setUser(JSON.parse(temp))
        }
    },[])

    const updateUserInfo = useCallback((info)=>{
        setUser(info)
    },[])

    return (
        <UserContext.Provider value={{user, updateUserInfo}}>
            {children}
        </UserContext.Provider>
    )
}   