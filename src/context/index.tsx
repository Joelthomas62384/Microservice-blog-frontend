"use client";

import React, { useState, ReactNode, useContext, createContext, useEffect } from "react";
import {getCookie} from 'typescript-cookie'

interface UserData {
  id: number;
  email: string;
  user_image: string;
  username: string;
  full_name: string;
  is_active: boolean;
  is_staff: boolean;
  date_joined: string;
}

interface AuthContextType {
  user: UserData | null;
  setUser: (user: UserData | null) => void;
  userLoggedIn: boolean;
  setUserLoggedIn: (loggedIn: boolean) => void;  
  logout :  ()=>void;
  loginModalToggle : ()=>void;
  loginModal : boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserData | null>(null);
  const [userLoggedIn, setUserLoggedIn] = useState<boolean>(true);
  const [loginModal, setLoginModal] = useState(false)


  const loginModalToggle = () => {
    if (!userLoggedIn) setLoginModal(!loginModal)
  }

  const logout = () => {
    setUser(null)
    setUserLoggedIn(false)
  }


  
  useEffect(() => {
    const token = getCookie('expiry')
    console.log(token)

    if (!token) {
      setUserLoggedIn(false)
    }
  }, [])
  


  return (
    <AuthContext.Provider value={{ user, setUser, userLoggedIn, setUserLoggedIn , logout,loginModalToggle , loginModal}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
