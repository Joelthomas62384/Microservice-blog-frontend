"use client"

import React, { useState, ReactNode, useContext } from "react";
import { createContext } from "react";

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
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserData | null>(null);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};