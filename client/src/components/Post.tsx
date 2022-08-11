import React, { useContext, useEffect, useState } from 'react'
import { environment } from '../environments/environment'
import Text from './Text'
import '../styles/Post.scss'
import { AiFillStar, AiOutlineStar } from 'react-icons/ai'
import { FaHeart, FaRegCommentDots, FaRegHeart } from 'react-icons/fa'
import { FiShare2 } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { AuthContext } from '../Auth'

interface PostProps { 
    handle: string,
    username: string,
    media: string,
    text_message: string,
    likes: number,
    date: string,
    isVideo: boolean,
    postId: string,
    nbComments: number
}
const clickable = [false, false];

function liked(clicked: boolean) {
    if(clicked) return (<FaHeart color='red' size='24px'/>)
    else return (<FaRegHeart color='black' size='24px'/>)
}

function Post({handle, username, media, text_message, likes, date, postId, nbComments}:PostProps) {
    const {currentUser} = useContext(AuthContext);
    function faved(clicked: boolean) {
        if(clicked) {
            console.log('vkhadvihbd');
            axios.post(`${environment.serverUrl}/database/favorite/${currentUser.email}..${postId}`)
            return (<AiFillStar color = '#8773F0' size={'32px'}/>);
        }
        else {
            return (<AiOutlineStar color = 'black' size={'32px'}/>);
        }
    }
    let navigate = useNavigate();
    const [stateLike, changeStateLike] = useState(liked(clickable[0]));
    const [stateFave, changeStateFave] = useState(faved(clickable[1]));
    return (
        <div className='post'>
            <div className = 'header'>
                <div className = 'poster'>
                    <img src={`${environment.serverUrl}/database/image/${handle}`} alt="" />
                    <Text type='H3 bold' content={`${username}`}></Text>
                </div>
                <Text content={date} color = 'rgba(0, 0, 0, 0.53)'/>
                <div onClick={() => {clickable[1] = !clickable[1]; changeStateFave(faved(clickable[1]))}}>
                    {stateFave}
                </div>
            </div>
            <Text content={text_message}/>
            <img className = 'image-post' src= {`${environment.serverUrl}/image/${media.replace('./assets/profile-pics/', '')}`} alt="" />
            <div className = 'footer'>
                <div id = 'likes' onClick={() => {clickable[0] = !clickable[0]; changeStateLike(liked(clickable[0]))}}>
                    {stateLike}
                    <Text content = {likes.toString()}></Text>
                </div>
                <div id = 'comments' onClick={() => {navigate(`/Post/${postId}`, { replace: true }); window.location.reload();}}>
                    {<FaRegCommentDots color='black' size='24px'/>}
                    <Text content = {nbComments.toString()}></Text>
                </div>
                {<FiShare2 color='black' size='24px'/>}
            </div>
        </div>
    )
}


export default Post