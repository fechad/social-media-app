import React, { useEffect, useState, createContext, useContext } from "react";
import axios from "axios";
import { environment } from "./environments/environment";
import { AuthContext } from "./Auth";


export const DataContext = createContext<any>(null);

export function  UserDataContext({children}:any) {

  const {currentUser} = useContext(AuthContext);
  const [pending, setPending] = useState(true);
  const [data, getData] = useState({
    "email": 'none',
    "handle" : 'none',
    "profile_pic" : 'none',
    "age" : 'none',
    "account_name" : 'none',
    "private_account" : 'false',
    "bio" : 'none',
    "news_options" : 'All',
    "local_news" : 'false',
    "french_language" : 'false', 
  });

  useEffect(() => {
    axios.get(`${environment.serverUrl}/database/users/MyInfos/${currentUser.email}`).then((infos)=>{
      getData(infos.data[0]);
      setPending(false);
    }) ;

  }, []);

  if(pending){
    return <> Loading</>
  }

  return (
    <DataContext.Provider
    value={{data}}
  >
    {children}
  </DataContext.Provider>
);
};