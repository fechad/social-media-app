import axios from 'axios'
import Text from '../components/Text'
import Button from '../components/Button'
import React, { useContext, useEffect, useState } from 'react'
import { environment } from '../environments/environment'
import { AuthContext } from '../Auth'
import '../styles/UserProfile.scss'
import { FiEdit } from 'react-icons/fi'
import LeftSidePane from '../components/LeftSidePane'
import RightSidePane from '../components/RightSidePane'
import NavBar from '../components/NavBar'
import Tabs from '../components/Tabs'
import Post from '../components/Post'

const UserProfile = () => {
    const [data, getData] = useState({
        "email": 'none',
        "handle" : 'none',
        "profile_pic" : 'none',
        "age" : 'none',
        "account_name" : 'none',
        "private_account" : 'false',
        "bio" : 'none',
        "news_options" : 'All',
        "local_news" : 'false',
        "french_language" : 'false', 
    });
    const [friendsList, setFriends] = useState([{
        'account_name': 'none',
        'handle': 'none',
        'profile_pic': 'none',
    }]);

    const [postList, setPost] = useState([{
        'handle': 'none',
        'post_id': '0',
        'media': 'none',
        'text_message': 'none',
        'likes': 0,
        'date': '00-00-00',
        'isVideo': false,
        'comments_number': 0,

    }]);
    const [faveList, setFavorite] = useState([{
        'handle': 'none',
        'post_id': '0',
        'media': 'none',
        'text_message': 'none',
        'likes': 0,
        'date': '00-00-00',
        'isVideo': false,
        'comments_number': 0,

    }]);
    const {currentUser} = useContext(AuthContext);
    const retrieveInfos = () => {
        axios.get(`${environment.serverUrl}/database/users/MyInfos/${currentUser.email}`).then((infos)=>{
            getData(infos.data[0]);
            axios.get(`${environment.serverUrl}/database/friends/${infos.data[0].email}`).then((friends)=>{
                setFriends(friends.data);
            })
            axios.get(`${environment.serverUrl}/database/users/post/${infos.data[0].handle}`).then((posts)=>{
                console.log(posts.data);
                setPost(posts.data);
            })
            axios.get(`${environment.serverUrl}/database/users/favorite/${infos.data[0].handle}`).then((favorite)=>{
                setFavorite(favorite.data);
            })
        })  
    }
    const friends = friendsList.map((friend, index) => {
        if(friend.handle !== 'none') {
            return (
                <img className = 'friends-pic' key = {index} src={`${environment.serverUrl}/database/image/${friend.handle}`} alt="" width='32px' height = '32px'/>
            )
        } else return undefined;
    });

    const posts = postList.map((post, index) => {
        return (
            <Post key = {index} handle={post.handle} media={post.media} username={data.account_name} text_message={post.text_message} likes={post.likes} date={post.date} isVideo={post.isVideo} postId = {post.post_id} nbComments = {post.comments_number}></Post>
        )
    });

    const starred = faveList.map((post, index) => {
        return (
            <Post key = {index} handle={post.handle} media={post.media} username={data.account_name} text_message={post.text_message} likes={post.likes} date={post.date} isVideo={post.isVideo} postId = {post.post_id} nbComments = {post.comments_number}></Post>
        )
    });

    function publications(){
        return (
            <div>
                {posts}
            </div>
        )
    }

    function favorites(){
        return (
            <div>
                {starred}
            </div>
        )
    }
    // otherwise it makes an infinite amount of get request
    // eslint-disable-next-line react-hooks/exhaustive-deps 
    useEffect(()=>{retrieveInfos()}, []);
    return (
        <div id = 'page-container'>
            <div className='LeftSideContainer'><LeftSidePane /></div>
            <NavBar selection='' />
            <div className = 'infos-container'>
                <div className = 'left-infos'>
                    <img id = 'test' src={`${environment.serverUrl}/database/image/${currentUser.email}`} alt="" width='72px' height='72px'/>
                    <div>
                        <div className='id-container'>
                            <Text content = {`${data.account_name}`} type = 'H3'></Text>
                            <Text content = {`${data.age} years old`} type = 'H3' color = 'rgba(0, 0, 0, 0.5)'></Text>
                        </div>
                        <Text content = {`@${data.handle}`} color = 'rgba(0, 0, 0, 0.5)' type='H3'></Text>
                    </div>
                </div>
                <Button text='edit' icon = {<FiEdit color = 'white'/>}></Button>
            </div>
            <div className = 'bio-container'>
                <Text content = {`${data.bio}`}></Text>
            </div>
            <div className ='avatar-list'>
                <div className = 'friends'>
                    <Text content = 'Friends List' type = 'H2'></Text>
                    <div className='friends-display'>
                        {friends}
                        <p className = 'see-more'>see more</p>
                    </div>
                </div>
                <div className = 'friends'>
                    <Text content = 'Group List' type = 'H2'></Text>
                    <div className='friends-display'>
                        {friends}
                        <p className = 'see-more'>see more</p>
                    </div>
                </div>
            </div>
            <Tabs pages={[publications(), favorites()]} ></Tabs>
            <div className ='RightSideContainer'><RightSidePane /></div>
        </div>
    )
}

export default UserProfile