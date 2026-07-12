import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({children})=>{
    const [user, setUser] = useState(()=>{
        const theUser = localStorage.getItem('user');
        return theUser ? JSON.parse(theUser):null
    });

    const login = (user, token)=>{
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('token', token);
        setUser(user);
    }
    const logOut = ()=>{
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        setUser(null);
    }

    return(
        <AuthContext.Provider value={{user, login, logOut}}>
            {children}
        </AuthContext.Provider>
    )
}
