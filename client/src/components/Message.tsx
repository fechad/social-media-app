import React from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/Message.scss'
import Avatar from './Avatar'

interface MessageProps {
    message: string,
    time: string,
    sender: boolean, //The sender is always the user. aka purple box
    profile_pic: string,
    handle: string, //will be used to implement the onClick => send to user profile

}

const Message = ({message, time, sender, profile_pic, handle}:MessageProps) => {

    let navigate = useNavigate();

  return (
    <section className={`message-section${sender ? ' sender' : ' receiver'}`}>
        <div className='message-avatar-section' onClick={() => {navigate(`/User/Profile/${handle}`, { replace: true }); window.location.reload();}}>
            <Avatar inGroup={false} online={false} photo={profile_pic} />
        </div>
       <div className='message-bubble-and-tooltip-container'>
            <div className='message-tooltip-container'>
                
            </div>
            <div className={`message-bubble-container${sender ? '-sender' : '-receiver'}`}>
                <div className='message-time'>
                    <p> {time}</p>
                </div>
                <div className='message-message'>
                    <p>{message}</p>
                </div>
            </div>
       </div>
    </section>
  )
}

export default Message