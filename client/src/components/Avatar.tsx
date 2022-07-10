import React from 'react'
import '../styles/Avatar.scss'

interface AvatarProps { 
    photo: string,
    online: boolean,
}

const Avatar = ({photo, online}: AvatarProps) => {
  return (
    <div className='AvatarContainer'>
        <div>
            <img className='AvatarImg' src={photo} alt="" />
        </div>
        {online ? <div className='OnlineIndicator' /> : ''}
    </div>
  )
}

export default Avatar