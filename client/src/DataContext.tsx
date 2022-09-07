import React, { useEffect, useState, createContext, useContext } from "react";
import axios from "axios";
import { environment } from "./environments/environment";
import { AuthContext } from "./Auth";
import { io } from 'socket.io-client'

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

  const [notifications, getNotifications] = useState([{
    notificationId: '',
    photos: '',
    title: '',
    description: '',
    seen: '',
    destination_handle: '',
    url: '',
  }]);

  const [chats, getChats] = useState([{
    chatid: '0',
    message_log: '',
    members: 'oveezion;users/*',
  }]);

  const[activeUsers, setActiveUsers] = useState([{
    handle: ''
  }])

  const [socket, setSocket] = useState(io(`${environment.socketUrl}`));

  socket.connect();

  socket.on('current active users', users => {
    let userList = users.filter((user: any) => user.handle !== 'none');
    console.log(userList);
    setActiveUsers(userList);
  })
 

  useEffect(() => {
    axios.get(`${environment.serverUrl}/database/users/MyInfos/${currentUser.email}`).then((infos)=>{
      getData(infos.data[0]);

      axios.get(`${environment.serverUrl}/database/users/MyInfos/notifications/${infos.data[0].handle}`).then((notifications)=>{
        getNotifications(notifications.data);
      }) ;

      axios.get(`${environment.serverUrl}/database/users/MyInfos/chats/${infos.data[0].handle}`).then((result)=>{
        getChats(result.data);
        setPending(false);
      }) ;
    }) ;

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {

    socket.emit('join server', data, function(response: any) {
      let userList = response.filter((user: any) => user.handle !== 'none');
      console.log(userList);
      setActiveUsers(userList);
    });

  }, [data, socket])

  if(pending){
    return <> Loading</>
  }

  return (
    <DataContext.Provider
    value={{data,notifications,chats, socket}}
  >
    {children}
  </DataContext.Provider>
);
};