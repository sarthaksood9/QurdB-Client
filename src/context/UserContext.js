import { createContext, useState } from "react";

export const UserContext=createContext();

export const UserProvider =({children})=>{

    const [user,setUser]=useState(JSON.parse(localStorage.getItem('user'))||null);

   

    const logIn=(userData)=>{
        setUser(userData);
        localStorage.setItem('user',JSON.stringify(userData));
    }


    const logOut=()=>{
        setUser(null);
        localStorage.removeItem('user');
    }

    return(
        <UserContext.Provider value={{user,logIn,logOut}}>
            {children}
        </UserContext.Provider>
    )
}