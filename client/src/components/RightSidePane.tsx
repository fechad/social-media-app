import React, { useState } from 'react'
import { AiOutlinePlus } from 'react-icons/ai'
import {HiOutlineCog} from 'react-icons/hi'
import '../styles/RightSidePane.scss'
import Button from './Button'
import ChatPreview from './ChatPreview'
import NotificationCard from './NotificationCard'
import Switch from './Switch'
import Text from './Text'
import '../styles/Theme/DarkTheme.scss';
import { FiLogOut, FiUser } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'
import { getAuth, signOut  } from "firebase/auth";
import { app } from '../firebaseConfig'

function swithTheme(){
    const sidepane = document.getElementsByClassName('RightSidePaneContainer')[0] as HTMLElement;
    const target = sidepane.firstChild?.firstChild?.firstChild as HTMLElement;
    //console.log(target)
    //console.log(target.classList)
    if(target.classList.contains('DarkMode')){
        //console.log('entered')
        document.body.setAttribute('theme', 'dark');
    } else{
        document.body.setAttribute('theme', 'light');
    }
   // console.log('entered')
}



function RightSidePane() {

    function signOutOfWebsite(){
        const auth = getAuth(app);
        signOut(auth).then(() => {
            // Sign-out successful.
            navigate("/", { replace: true });
          }).catch((error) => {
            // An error happened.
          });
    }

    const [popupOpened, openPopup] = useState(false);

    let navigate = useNavigate();

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [groupConvos, setGroupConvos] = useState([{
        id: '12',
        photos: ['/logo.svg', '/logo.svg'],
        names: ['Étienne Aumais', 'Fedwin Chatelier'],
        latest: 'Bro on invite tu du monde à la ronde?',
        read: false,
    }])
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [newNotifications, setNewNotifications] = useState([{
        id: '11',
        photos: ['/logo.svg', '/logo.svg'],
        title: 'Oveezion and others liked this post',
        message: 'This week celebrate summer with this brand new summer event.',
        read: false
    }])
    
  return (
    <section className='RightSidePaneContainer'>
        <div className='HeaderArea'>
            <Switch resp='theme' role={swithTheme}/>
            <div className='ProfileAvatar'>
                <img src='/logo.svg' alt="" height="87"width="50" onClick={() => openPopup(!popupOpened)}></img>
                {
                    popupOpened ? 
                    <div className='PopupContainer'>
                        <div className='PopupTail'></div>
                        <div className='PopupOptionGroup'>
                            <div className='PopupOptions' onClick={() => navigate("/User/Profile", { replace: true })}>
                                <FiUser size={20} />
                                <Text type='H3' content='My profile' />
                            </div>
                            <div className='PopupOptions'>
                                <HiOutlineCog size={20} />
                                <Text type='H3' content='Settings' />
                            </div>
                            <div className='PopupOptions' onClick={() => signOutOfWebsite()}>
                                <FiLogOut size={20} />
                                <Text type='H3' content='Sign-out' />
                            </div>
                        </div>
                    </div>
                    : ''
                }
            </div>
        </div>
        <div className='NotificationArea'>
            <div className='Header'>
                <Text type='H2' content='New Notifications'/>
                <Switch resp='notifications'/>
            </div>
            <div className='RecentNotifications'>
                {newNotifications.map((notification)=>{
                    return(

                        <div className='NotificationContainer'>
                            <NotificationCard notificationId={notification.id} photos={notification.photos} title={notification.title} message={notification.message} read={notification.read} />
                         </div> 
                    )           
                })} 
            </div>
        </div>
        <div className='GroupChatArea'>
            <div className='Header'>
                <Text type='H2' content='My Group Chats'/>
                <Button text=''  icon={<AiOutlinePlus size={30}/>} color=' '/>
            </div>
            <div className='RecentGroupConvos'>
                {groupConvos.map((group)=>{
                    return(
                        
                        <div className='GroupChatContainer'>
                            <ChatPreview  chatId={group.id} photos={group.photos} names={group.names} latest={group.latest} read={group.read} groupChat={true}/>
                        </div> 
                    )           
                })}
            </div>
        </div>
    </section>
  )
}

export default RightSidePane