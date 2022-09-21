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
import { screenRatio } from '../ScreenRatio'

const Chats = () => {

  screenRatio.calculate()
  console.log('rerendered')

  const { chats } = useContext(DataContext);
  const { data } = useContext(DataContext);
  const { socket } = useContext(DataContext);

  let { id } =useParams();


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

  //const [socket, setSocket] = useState(io(`${environment.socketUrl}`));
  //let socket = io(`${environment.socketUrl}`)

  socket.id = useParams() as unknown as string;

  
  socket.on('connected', (message: any) => {
    console.log(message);
  });

  socket.on('new message', (message: any) => {
    console.log('new message',message)

    let updatedMessages = messages.map(message => message);
    updatedMessages.push(message);

    setMessages(updatedMessages);
  });
 
  
  useEffect(() => {
    

  }, [useParams()])

  useEffect(() => {
    

  }, [messages])

  useEffect(() => {
    console.log(socket.id);

    console.log(chats)

    setMembersPhoto(chats?.filter((chat: any) => chat.chatid === id)[0]?.users);

    socket.emit('join room', id, function(response: any) {
    console.log(response);
    setMessages(response);
    })

   

  }, [socket.id])

  

  useEffect(() => {
    //setMessages(chats.filter((chat: any) => chat.chatid === id)[0].messages);
    //setMembersPhoto(chats.filter((chat: any) => chat.chatid === id)[0].users)
    eventBus.on('sendMessage', (e: any) => {
      //console.log(e.detail)
      if(e.detail.target !== id) return
      console.log(e.detail)
      const offset = new Date().getTimezoneOffset();
      let yourDate = new Date(new Date().getTime() - (offset*60*1000));
      let dateTime = yourDate.toISOString().split('T')[1].padStart(2, '0');
      let newMessage = {
        messageid: `${Date.now()}`,
        chatid: id!,
        replyid: e.detail.replyTo.id, 
        messagetime: `${dateTime}`,
        handle: data?.handle,
        textmessage: e.detail.message,
        media: e.detail.data.includes('.gif') ? e.detail.data : e.detail.serverMediaName,
        file_name: e.detail.serverFsName,
      }
  
      //console.log(updatedMessages)
      socket.emit('send message', newMessage, id);
    });

    eventBus.on('messageAction', (e: any) => {
      //console.log(e.detail, 'Library')
    });


    document.getElementsByClassName('chat-page-messages-container')[0].scrollTop = document.getElementsByClassName('chat-page-messages-container')[0].scrollHeight;

  }, [])

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
            <MessageBar target={id} />
          </div>
        </div>
      </div>
      <div className ='RightSideContainer'><RightSidePane /></div>
    </div>
  )
}

export default Chats