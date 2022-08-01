import React from 'react'
import { environment } from '../environments/environment'
import Text from './Text'
import '../styles/Post.scss'
import { AiOutlineStar } from 'react-icons/ai'
import { FaRegCommentDots, FaRegHeart } from 'react-icons/fa'
import { FiShare2 } from 'react-icons/fi'

interface PostProps { 
    handle: string,
    username: string,
    media: string,
    text_message: string,
    likes: number,
    date: string,
    isVideo: boolean,
}

function Post({handle, username, media, text_message, likes, date}:PostProps) {
  return (
    <div className='post'>
        <div className = 'header'>
            <div className = 'poster'>
                <img src={`${environment.serverUrl}/database/image/${handle}`} alt="" />
                <Text type='H3 bold' content={`${username}`}></Text>
            </div>
            <Text content={date} color = 'rgba(0, 0, 0, 0.53)'/>
            {<AiOutlineStar color = 'black' size={'32px'}/>}
        </div>
        <Text content={text_message}/>
        <img className = 'image-post' src= {`${environment.serverUrl}/image/${media.replace('./assets/profile-pics/', '')}`} alt="" />
        <div className = 'footer'>
            {<FaRegHeart color='black' size='24px'/>}
            {<FaRegCommentDots color='black' size='24px'/>}
            {<FiShare2 color='black' size='24px'/>}
        </div>
    </div>
  )
}


export default Post