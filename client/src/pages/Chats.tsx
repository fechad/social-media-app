import React, { useContext, useEffect, useState } from 'react'
import LeftSidePane from '../components/LeftSidePane'
import NavBar from '../components/NavBar'
import RightSidePane from '../components/RightSidePane'
import { io } from 'socket.io-client'
import { environment } from '../environments/environment'
import { useParams } from 'react-router-dom'
import MessageBar from '../components/MessageBar'
import axios from 'axios'
import { DataContext } from '../DataContext'
import Message from '../components/Message'
import '../styles/Chats.scss'

const Chats = () => {

  const { chats } = useContext(DataContext);
  const { data } = useContext(DataContext);

  const { id } = useParams();

  const socket = io(`${environment.socketUrl}`);

  socket.id = id ? id : '0';
  
  socket.on('connected', (message) => console.log(message));
  socket.on('message', (message) => console.log(message));


  const [messages, setMessages] = useState([{
      messageid: '',
      chatid: '',
      replyid: '',
      messagetime: '',
      handle: '',
      textmessage: ''
  }]);

  const [membersPhoto, setMembersPhoto] = useState([
    {
      handle: '',
      profile_pic: ''
    }
  ]);

  useEffect(() => {
    console.log(socket.id);
    socket.connect();
    socket.emit('message', 'lolloo');

    axios.get(`${environment.serverUrl}/database/photoUrl/${chats.filter((chat: any) => chat.chatid === id)[0].members.replace('users/*', `${data.handle}`)}`).then((result)=>{
      setMembersPhoto(result.data);
    }) ;

    axios.get(`${environment.serverUrl}/database/message/${chats.filter((chat: any) => chat.chatid === id)[0].message_log}`).then((result)=>{
      setMessages(result.data);
    }) ;

  }, [socket.id])

  return (
    <div>
      <div className='LeftSideContainer'><LeftSidePane /></div>
      <div>
        <NavBar selection='chats' />
        <div className='chat-page-content'>
          <div className='chat-page-messages-container'>
            {
              messages.map((message) => {
                console.log(membersPhoto)
                  if(message.messageid === '') return ''
                  else return (
                    <Message key={message.messageid} message={message.textmessage} time={message.messagetime} sender={message.handle === data.handle} profile_pic={membersPhoto.filter(member => member.handle === message.handle)[0].profile_pic} handle={message.handle} chatID={message.chatid} />
                  )
              })
            }
          </div>
          <div className='chat-page-bar-container'>
              <MessageBar />
          </div>
        </div>
      </div>
      <div className ='RightSideContainer'><RightSidePane /></div>
    </div>
  )
}

export default Chats