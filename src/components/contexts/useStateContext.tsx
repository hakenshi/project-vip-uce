'use client'
import {Users} from "@prisma/client";
import {createContext, ReactNode, useContext, useEffect, useState} from "react";
import {User} from "lucide-react";
import {router} from "next/client";

interface UserContextType {
    user: Users | null;
    setUser: (user: Users | null) => void;
    token: string | null;
    setSessionToken: (token: string) => void;
}

export const StateContext = createContext<UserContextType>({
    user: null,
    setUser: () => {
    },
    token: null,
    setSessionToken: () => {
    },
})

export const ContextProvider = ({children}: { children: ReactNode }) => {
    const [user, setUser] = useState<Users | null>(null);
    const [token, setToken] = useState('');

    const setSessionToken = (token: string) => {
        setToken(token);
        if (token) {
            sessionStorage.setItem("token", token);
        } else {
            sessionStorage.removeItem("token");
        }
    }


    return (
        <StateContext.Provider value={{user, setUser, setSessionToken, token}}>
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext)