import React from 'react'
import Avatar from './Avatar'
import Text from './Text'
import '../styles/NotificationCard.scss'
import { environment } from '../environments/environment'


//TODO: Faire table pour notifications
interface NotificationCardProps { 
    notificationId?: string,
    photos: string[],
    title: string,
    message: string,
    read: boolean
}

function NotificationCard({notificationId, photos, title, message, read} : NotificationCardProps) {
  return (
    <div className='NotificationCardContainer'>
        <div className='NotificationHeader'>
            <div className='AccountAvatars'>
                <Avatar photo={`${environment.serverUrl}/image/${photos[0].includes('./assets/logo') ? photos[0].replace('./assets/logo/', '') : photos[0].replace('./assets/profile-pics/', '')}`} online={false} inGroup={photos.length > 1 ? true : false} />
                {
                    photos[1] ? <Avatar photo={photos[1]} online={false}  inGroup={true} /> : ''
                }
            </div>
            <div className='TitleContainer'>
                <Text type={'H3'} bold={true} content={title}/>
            </div>
        </div>
        <div className='Message'>
            <Text type={'body'} bold={!read} content={message}/>
        </div>
    </div>
  )
}

export default NotificationCard