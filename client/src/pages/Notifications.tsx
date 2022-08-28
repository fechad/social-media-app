import React, { useEffect, useState } from 'react'
import LeftSidePane from '../components/LeftSidePane'
import NavBar from '../components/NavBar'
import NotificationCard from '../components/NotificationCard'
import RightSidePane from '../components/RightSidePane'
import Tabs from '../components/Tabs'
import '../styles/Notifications.scss'

const Notifications = () => {

  const [clicked, setClick] = useState(0);

  
  function all(){
    return (
      <div>
        <NotificationCard notificationId='0' photos={['../logo.svg']} title='Welcome to Chymera' message='This is the beta version 1.3. Chat and comments are still disabled for now. Chat and comments are still disabled for now.' read={false}/>
      </div>
    )
  }

  function requests(){
    return (
      <div>
          starred
      </div>
    )
  }

  function likes(){
    return (
      <div>
          starred
      </div>
    )
  }

  function mentions(){
    return (
      <div>
          starred
      </div>
    )
  }

  const retrieveInfos = () => {
    
  }

  
  // eslint-disable-next-line react-hooks/exhaustive-deps 
  useEffect(()=>{retrieveInfos()}, [clicked]);

  return (
    <div>
      <div className='LeftSideContainer'><LeftSidePane /></div>
      <div>
        <NavBar selection='notifications' />
        <div className='notification-page-container'>
          <Tabs tabs='All;Requests;Likes;Mentions' pages={[all(), requests(), likes(), mentions()]} titleFct = {()=>{setClick(clicked + 1)}}></Tabs>

        </div>
      </div>
      <div className ='RightSideContainer'><RightSidePane /></div>
    </div>
  )
}

export default Notifications