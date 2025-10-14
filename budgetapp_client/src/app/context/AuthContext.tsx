'use client'

import { AuthContextType } from "@/interfaces/AuthContextTypes";
import { createContext, useContext, useEffect, useState } from "react"

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }) {
    
    const [userId, setUserId] = useState(null as string | null);
    const [token, setToken] = useState(null as string | null);
    const isAuthenticated = !!token

    useEffect(()=>{
        const storedToken = localStorage.getItem("token")
        const storedUserId = localStorage.getItem("userId")
        if(storedToken) setToken(storedToken)
        if(storedUserId) setUserId(storedUserId)
    },[])

    
    const login = (token: string, userId: string) => {
        localStorage.setItem("token", token)
        localStorage.setItem("userId", userId)
        setToken(token)
        setUserId(userId)
    }

    const logout = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("userId")
        setToken(null)
        setUserId(null)
    }

    return(
        <AuthContext.Provider value={{
            userId,
            token,
            isAuthenticated,
            login,
            logout
        }}>
            {children}
        </AuthContext.Provider>
    )
   
}

export const useAuth = () => useContext(AuthContext)


