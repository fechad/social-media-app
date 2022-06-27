import React, { useEffect, useState, createContext } from "react";
import { app } from "./firebaseConfig";
import {getAuth} from "firebase/auth"


export const AuthContext = createContext<any>(null);

export function  AuthProvider({ children }:any){
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [pending, setPending] = useState(true);

  useEffect(() => {
    getAuth(app).onAuthStateChanged((user) => {
      setCurrentUser(user)
      setPending(false)
    });
  }, []);

  
  if(pending){
    return <> Loading</>
  }

  return (
    <AuthContext.Provider
    value={{currentUser}}
  >
    {children}
  </AuthContext.Provider>
);
};