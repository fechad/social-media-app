import React from 'react'
import '../styles/Avatar.scss'

interface AvatarProps { 
    photo: string,
    online: boolean,
    inGroup?: boolean
}

const Avatar = ({photo, online, inGroup}: AvatarProps) => {
  return (
    <div className='AvatarContainer'>
        <div>
            <img className={`AvatarImg ${inGroup? 'InGroup' : ''}`} src={photo} alt="" />
        </div>
        {online ? <div className='OnlineIndicator' /> : ''}
    </div>
  )
}

export default Avatar