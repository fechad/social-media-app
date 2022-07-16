import React from 'react'
import { BsChatDots, BsNewspaper } from 'react-icons/bs'
import { FaGlobe } from 'react-icons/fa'
import { FiBell, FiUsers } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'
import '../styles/NavBar.scss'
import Button from './Button'

interface NavBarProps{
    selection?: string
  }
  

const NavBar = ({selection}: NavBarProps) => {
    const navigate = useNavigate();
    const navigateDiscover = () => {
        navigate("/User/Discover", { replace: true });
    }

    const navigateMyFeed = () => {
        navigate("/User/MyFeed", { replace: true });
    }

    const navigateNewsFeed = () => {
        navigate("/User/NewsFeed", { replace: true });
    }

    const navigateNotifications= () => {
        navigate("/User/Notifications", { replace: true });
    }

    const navigateChats= () => {
        navigate("/User/Chats", { replace: true });
    }

  return (
    <div className='NavBarContainer'>
        <Button text='' color='' fct={navigateDiscover} icon={<FaGlobe className='NavBarGlobe' size={30} color={selection === 'discover' ? '#8773F0' : ''}/>} />
        <Button text='' color='' fct={navigateMyFeed} icon={<FiUsers className='NavBarUsers' size={30} color={selection === 'myFeed' ? '#8773F0' : ''}/>} />
        <Button text='' color='' fct={navigateNewsFeed} icon={<BsNewspaper className='NavBarNews' size={30} color={selection === 'newsFeed' ? '#8773F0' : ''}/>} />
        <Button text='' color='' fct={navigateNotifications} icon={<FiBell className='NavBarBell' size={30} color={selection === 'notifications' ? '#8773F0' : ''}/>} />
        <Button text='' color='' fct={navigateChats} icon={<BsChatDots className='NavBarBubbles' size={30} color={selection === 'chats' ? '#8773F0' : ''}/>} />
    </div>
  )
}

export default NavBar