import { createContext, useCallback, useState } from "react";

export const UserContext = createContext()

export const UserContextProvider = ({children})=>{
    const [user] = useState(null);

    const [registerInfo, setRegisterInfo] = useState({
        name: "",
        email: "",
        password: ""
    })

    console.log(registerInfo)

    const updateRegisterInfo = useCallback((info)=>{
        setRegisterInfo(info)
    },[])

    return (
        <UserContext.Provider value={{user, registerInfo, updateRegisterInfo}}>
            {children}
        </UserContext.Provider>
    )
}   