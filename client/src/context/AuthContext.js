"use client"

import { createContext, useState, useContext } from 'react';

const AuthContext = createContext(null)

export function AuthProvider({children}){
    const [userData, setUserData] = useState({});
    const value = { userData, setUserData };

    return (
        <AuthContext.Provider value={value} >
            {children}
        </AuthContext.Provider>
    )
}
export const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (!context) {
    //   console.log('useAuthContext must be used within AuthProvider');
    }
    return context;
  };