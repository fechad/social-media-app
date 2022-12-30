import React, { useState } from 'react'
import { BiTrash } from 'react-icons/bi'
import { BsFillPinAngleFill } from 'react-icons/bs'
import { HiReply } from 'react-icons/hi'
import { useNavigate } from 'react-router-dom'
import '../styles/Message.scss'
import Avatar from './Avatar'
import eventBus from '../components/eventBus';
import { environment } from '../environments/environment'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { style } from '@mui/system'

interface MessageProps {
    message: string,
    time: string,
    sender: boolean, //The sender is always the user. aka purple box
    profile_pic: string,
    handle: string, //will be used to implement the onClick => send to user profile
    chatID ?: string,
    messageID?: string,
    media?: string,
    file?: string,
    replyMessage?: string,
    replyId?: string
}

const Message = ({message, time, sender, profile_pic, handle, chatID, messageID, media, file,  replyId, replyMessage}:MessageProps) => {

    let navigate = useNavigate();
    const [showTooltips, setShowTooltips] = useState(false)
    const [show, setShow] = useState('');

    const handleClick = (e: any, action: string) => {

        const messageAction = new CustomEvent('messageAction', {bubbles: true, composed: true,  detail: {purpose: action, chatId: chatID, messageId: messageID, message: message, handle: handle}});

        eventBus.dispatch('messageAction', messageAction)
    }

    // const id = messageID ? messageID : '';

  return (
    <div id={messageID} style={{display: 'flex', flexDirection: 'column'}} onMouseLeave={() => setShowTooltips(false)}>
       {
        replyId ? 
        <div className='message-reply-container' style={{flexDirection: sender ? 'row-reverse' : 'row'}} onClick={()=> {document.getElementById(replyId!)?.scrollIntoView({block: 'center', inline: 'center'}); document.getElementById(replyId!)?.focus() }}>
            <div className='message-reply-bubble' style={sender ? {marginRight: '10.8%'} : {marginLeft: '10.8%'}}>
                <p>{replyMessage}</p>
            </div>
        </div>
        : ''
       }
        <div className={`message-section${sender ? '-sender' : '-receiver'}`} style={replyId ? {padding: '0px 0px 0px 0px'} : {padding: '40px 0px 0px 0px'}}>
            <div className='message-avatar-section' onClick={() => {navigate(`/User/Profile/${handle}`, { replace: true }); window.location.reload();}}>
                <Avatar inGroup={false} online={false} photo={`${environment.serverUrl}/image/` + profile_pic.replace('./assets/profile-pics/', '')} />
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
                            {
                                file ?
                                <a href={`${environment.serverUrl}/file/${file.replace('./assets/files/', '')}`} download> <p className='file-message'>{file}</p> </a>
                                : ''
                            }
                            {
                                media ? 
                                <div className='message-media-container ' style={{flexDirection: sender ? 'row-reverse' : 'row'}} onClick={(e)=>{
                                    
                                    if(e.currentTarget?.classList.contains('image-display')) {
                                        e.currentTarget?.classList.remove('image-display');
                                        e.currentTarget?.classList.remove('background');
                                    } else {
                                        e.currentTarget?.classList.add('image-display');
                                        e.currentTarget?.classList.add('background');
                                    }
                                    }}>
                                   
                                   {
                                    media.slice(0,6) === 'image-' || media.includes('.png') || media.includes('.jpg') || media.includes('.jpeg') || media.includes('.gif')? <div> <img src={`${media.includes('.gif') ? media : environment.serverUrl}/image/${media.replace('./assets/images/', '')}`} alt="" /> </div>
                                    : <div> <video controls src={`${environment.serverUrl}/video/${media.replace('./assets/videos/', '')}`}></video> </div>
                                   }
                                </div>
                                : ''
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Message