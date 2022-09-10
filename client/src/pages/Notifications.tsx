import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import LeftSidePane from '../components/LeftSidePane'
import NavBar from '../components/NavBar'
import NoContent from '../components/NoContent'
import NotificationCard from '../components/NotificationCard'
import RightSidePane from '../components/RightSidePane'
import Tabs from '../components/Tabs'
import { DataContext } from '../DataContext'
import { screenRatio } from '../ScreenRatio'
import '../styles/Notifications.scss'

const Notifications = () => {

  screenRatio.calculate()

  const [clicked, setClick] = useState(0);
  let {notifications} = useContext(DataContext);
  let navigate = useNavigate();
  
  function all(){
    return (
     <div>
        {notifications.map((notification:any, index: any)=>{
          return(

            <div key={index} className='NotificationContainer' onClick={() => navigate("/User/Notifications", { replace: true })}>
              <NotificationCard notificationId={notification.notificationId} photos={notification.photos.split(';')} title={notification.title} message={notification.description} read={notification.seen=== 'true' ? true : false} />
            </div> 
          )})
        } 
    </div>
    )
  }

  function requests(){
    return (
      <div>
        <NoContent reason='new notifications'/>
      </div>
    )
  }

  function likes(){
    return (
      <div>
        <NoContent reason='new notifications'/>
      </div>
    )
  }

  function mentions(){
    return (
      <div>
        <NoContent reason='new notifications'/>
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