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
import eventBus from '../components/eventBus'

const Chats = () => {

  const { chats } = useContext(DataContext);
  const { data } = useContext(DataContext);
  const { socket } = useContext(DataContext);

  const { id } = useParams();

  socket.id = id ? id : '0';

  socket.emit('join room', id, function(response: any) {
    console.log(response);
  })
  
  socket.on('connected', (message: any) => console.log(message));

  socket.on('message', (message: any) => console.log(message));


  const [messages, setMessages] = useState([{
      messageid: '',
      chatid: '',
      replyid: '',
      messagetime: '',
      handle: '',
      textmessage: '',
      media: '',
      file_name: '',
  }]);

  const [membersPhoto, setMembersPhoto] = useState([
    {
      handle: '',
      profile_pic: ''
    }
  ]);

  useEffect(() => {
    console.log(socket.id);

    axios.get(`${environment.serverUrl}/database/photoUrl/${chats.filter((chat: any) => chat.chatid === id)[0].members.replace('users/*', `${data.handle}`)}`).then((result)=>{
      setMembersPhoto(result.data);
    }) ;

    axios.get(`${environment.serverUrl}/database/message/${chats.filter((chat: any) => chat.chatid === id)[0].message_log}`).then((result)=>{
      setMessages(result.data);
    }) ;

  }, [socket.id])


  useEffect(()=>{

    

    eventBus.on('sendMessage', (e: any) => {
      console.log(e.detail)
      const offset = new Date().getTimezoneOffset();
      let yourDate = new Date(new Date().getTime() - (offset*60*1000));
      let dateTime = yourDate.toISOString().split('T')[1].padStart(2, '0');

      console.log(messages)

      let updatedMessages = messages.map(message => message);
      let newMessage = {
        messageid: `${Date.now()}`,
        chatid: id!,
        replyid: e.detail.replyTo.id, 
        messagetime: `${dateTime}`,
        handle: data.handle,
        textmessage: e.detail.message,
        media: e.detail.data.includes('.gif') ? e.detail.data : e.detail.serverMediaName,
        file_name: e.detail.serverFsName,
      }
      updatedMessages.push(newMessage);

      console.log(updatedMessages)
      setMessages(updatedMessages);

      socket.emit('message', 'lolloo');
      socket.emit('message', newMessage);

    });

    document.getElementsByClassName('chat-page-messages-container')[0].scrollTop = document.getElementsByClassName('chat-page-messages-container')[0].scrollHeight;

    eventBus.on('messageAction', (e: any) => {
       console.log(e.detail, 'Library')
    });
  }, [messages])

  return (
    <div>
      <div className='LeftSideContainer'><LeftSidePane /></div>
      <div>
        <NavBar selection='chats' />
        <div className='chat-page-content'>
          <div className='chat-page-messages-container'>
            {
              messages.map((message) => {
                  if(message.messageid === '') return ''
                  else return (
                    <Message key={message.messageid} messageID={message.messageid} message={message.textmessage} time={message.messagetime} sender={message.handle === data.handle} profile_pic={membersPhoto.filter(member => member.handle === message.handle)[0].profile_pic} handle={message.handle} chatID={message.chatid} media={message.media} file={message.file_name} replyId={message.replyid} replyMessage={messages.find(mesg => mesg.messageid === message.replyid)?.textmessage} />
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