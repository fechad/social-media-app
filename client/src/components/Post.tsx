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
    nbComments: number,
    isFaved: boolean,
    isLiked: boolean,
}

function Post({handle, username, media, text_message, likes, date, postId, nbComments, isFaved, isLiked}:PostProps) {
    let navigate = useNavigate();
    const {currentUser} = useContext(AuthContext);
    const [bookmarked, setBookmark] = useState(isFaved);
    const [liked, setLike] = useState(isLiked);
    const [nbLikes, setLikes] = useState(likes);
    
    const like = (liked: boolean) => {
        if(liked) {
            setLikes(nbLikes + 1);
            axios.post(`${environment.serverUrl}/database/like/${currentUser.email}..${postId}`);
        }
        else {
            setLikes(nbLikes - 1);
            axios.post(`${environment.serverUrl}/database/delike/${currentUser.email}..${postId}`);
        }
        setLike(liked);
    }

    const bookmark = (add: boolean) => {
        if(add) {
            
            axios.post(`${environment.serverUrl}/database/favorite/${currentUser.email}..${postId}`);
        }
        else {
            
            axios.post(`${environment.serverUrl}/database/defavorite/${currentUser.email}..${postId}`);
        }
        setBookmark(add);
    }

   
    // const [stateLike, changeStateLike] = useState();
    // const [stateFave, changeStateFave] = useState();
    // useEffect(()=>{
    //     setBookmark(isFaved);
    // }, []);

    useEffect(()=>{
        //setBookmark(isFaved);
            // changeStateFave(()=>faved());
    }, [bookmarked, liked, nbLikes]);

    // useEffect(()=>{
    //     console.log(postId);
    //     axios.get(`${environment.serverUrl}/database/isFavorite/${currentUser.email}..${postId}`).then((res)=>{ 
    //         console.log(res.data);
    //         setBookmark(res.data);
    //     });
    // }, []);
    return (
        <div className='post'>
            <div className = 'header'>
                <div className = 'poster' onClick={() => {navigate(`/User/Profile/${handle}`, { replace: true }); window.location.reload();}}>
                    <img src={`${environment.serverUrl}/database/image/${handle}`} alt="" />
                    <Text type='H3 bold' content={`${username}`}></Text>
                </div>
                <Text content={date} color = 'rgba(0, 0, 0, 0.53)'/>
                <div onClick={() => {bookmark(!bookmarked)}} className='bookmark-area'>
                    {bookmarked ? <AiFillStar color = '#8773F0' size={'32px'}/> : <AiOutlineStar color = 'black' size={'32px'}/>}
                </div>
            </div>
            <Text content={text_message}/>
            <div className = 'size-restricter' id = {postId + media} onClick={()=>{
                    if(document.getElementById(`${postId}`)?.classList.contains('display')) {
                        document.getElementById(`${postId}`)?.classList.remove('display');
                        document.getElementById(`${postId + media}`)?.classList.remove('background');
                    } else {
                        document.getElementById(`${postId}`)?.classList.add('display');
                        document.getElementById(`${postId + media}`)?.classList.add('background');
                    }
                    }}>
                <img className = 'image-post' id = {postId} src= {`${environment.serverUrl}/image/${media.replace('./assets/profile-pics/', '')}`} alt="" />
            </div>
            <div className = 'footer'>
                <div id = 'likes' onClick={() => {like(!liked)}}>
                    {liked ? <FaHeart color='red' size='24px'/> : <FaRegHeart color='black' size='24px'/>}
                    <Text content = {nbLikes.toString()}></Text>
                </div>
                <div id = 'comments' /*onClick={() => {navigate(`/Post/${postId}`, { replace: true }); window.location.reload();}}*/>
                    {<FaRegCommentDots color='grey' size='24px'/>}
                    <Text color='grey' content = {nbComments.toString()}></Text>
                </div>
                {<FiShare2 className='share-area' color='grey' size='24px'/>}
            </div>
        </div>
    )
}



export default Post