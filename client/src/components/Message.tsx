import React from 'react'
import { BiPencil, BiTrash } from 'react-icons/bi'
import { BsFillPinAngleFill } from 'react-icons/bs'
import { HiReply } from 'react-icons/hi'
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
    <div className={`message-section${sender ? '-sender' : '-receiver'}`}>
        <div className='message-avatar-section' onClick={() => {navigate(`/User/Profile/${handle}`, { replace: true }); window.location.reload();}}>
            <Avatar inGroup={false} online={false} photo={profile_pic} />
        </div>
        <div className='message-bubble-and-tooltip-container'>
            <div className='message-hover-container'>
               <div className='message-edit'>
                    <div className='message-edit-tooltip'>
                        <p>Delete</p>
                    </div>
                    <BiTrash />
               </div>
               <div className='message-edit'>
                    <div className='message-edit-tooltip'>
                        <p>Pin</p>
                    </div>
                    <BsFillPinAngleFill />
               </div>
                <div className='message-edit'>
                    <div className='message-edit-tooltip'>
                        <p>Edit</p>
                    </div>
                    <BiPencil />
                </div>
                <div className='message-edit'>
                    <div className='message-edit-tooltip'>
                        <p>Reply</p>
                    </div>
                    <HiReply />
                </div>
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
    </div>
  )
}

export default Message