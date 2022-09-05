import React, { useState } from 'react'
import { BiTrash } from 'react-icons/bi'
import { BsFillPinAngleFill } from 'react-icons/bs'
import { HiReply } from 'react-icons/hi'
import { useNavigate } from 'react-router-dom'
import '../styles/Message.scss'
import Avatar from './Avatar'
import eventBus from '../components/eventBus';

interface MessageProps {
    message: string,
    time: string,
    sender: boolean, //The sender is always the user. aka purple box
    profile_pic: string,
    handle: string, //will be used to implement the onClick => send to user profile
    chatID ?: string,
    messageID?: string

}

const Message = ({message, time, sender, profile_pic, handle, chatID, messageID}:MessageProps) => {

    let navigate = useNavigate();
    const [showTooltips, setShowTooltips] = useState(false)
    const [show, setShow] = useState('');

    const handleClick = (e: any, action: string) => {

        const messageAction = new CustomEvent('messageAction', {bubbles: true, composed: true,  detail: {purpose: action, chatId: chatID, messageId: messageID, message: message, handle: handle}});

        eventBus.dispatch('messageAction', messageAction)
    }


  return (
    <div className={`message-section${sender ? '-sender' : '-receiver'}`} onMouseLeave={() => setShowTooltips(false)}>
        <div className='message-avatar-section' onClick={() => {navigate(`/User/Profile/${handle}`, { replace: true }); window.location.reload();}}>
            <Avatar inGroup={false} online={false} photo={profile_pic} />
        </div>
        <div className='message-bubble-and-tooltip-container'>
            <div className='message-bubble-container-tail'></div>
            <div className='message-bubble-container' onMouseOver={() => setShowTooltips(true)}>
                {
                    showTooltips? 
                    <div className='message-hover-container'>
                        <div className='message-edit' style={{display: `${sender ? '' : 'none'}`}} onMouseOver={() => setShow('Delete')} onMouseOut={() => setShow('')}  onClick={(e) => handleClick(e, 'Delete')}>
                            {
                                show === 'Delete'? 
                                <div className='message-edit-tooltip-container'>
                                    <div className='message-edit-tooltip'>
                                        <div className='message-edit-tooltip-tail'/>
                                        <p>Delete</p>
                                    </div>
                                </div>
                                : ''
                            }
                            <BiTrash size={20} />
                        </div>
                        <div className='message-edit' onMouseOver={() => setShow('Pin')} onMouseOut={() => setShow('')}  onClick={(e) => handleClick(e, 'Pin')}>
                            {
                                show === 'Pin' ? 
                                <div className='message-edit-tooltip-container'>
                                    <div className='message-edit-tooltip'>
                                        <div className='message-edit-tooltip-tail'/>
                                        <p>Pin</p>
                                    </div>
                                </div>
                                : ''
                            }
                            <BsFillPinAngleFill size={20} />
                        </div>
                        {/* <div className='message-edit' onMouseOver={() => setShow('Edit')} onMouseOut={() => setShow('')} onClick={(e) => handleClick(e, 'Edit')}>
                            {
                                show === 'Edit' ? 
                                <div className='message-edit-tooltip-container'>
                                    <div className='message-edit-tooltip'>
                                        <div className='message-edit-tooltip-tail'/>
                                        <p>Edit</p>
                                    </div>
                                </div>
                                : ''
                            }
                            <BiPencil size={20} />
                        </div> */}
                        <div className='message-edit' onMouseOver={() => setShow('Reply')} onMouseOut={() => setShow('')}  onClick={(e) => handleClick(e, 'Reply')}>
                            {
                                show === 'Reply' ? 
                                <div className='message-edit-tooltip-container'>
                                    <div className='message-edit-tooltip'>
                                        <div className='message-edit-tooltip-tail'/>
                                        <p>Reply</p>
                                    </div>
                                </div>
                                : ''
                            }
                            <HiReply size={20} />
                        </div>
                    </div>
                    : ''
                }
                <div className={`message-container${sender ? '-sender' : '-receiver'}`}>
                    <div className='message-time'>
                        <p> {time}</p>
                    </div>
                    <div className='message-message'>
                        <p>{message}</p>
                    </div>
                </div>
            </div>
       </div>
    </div>
  )
}

export default Message