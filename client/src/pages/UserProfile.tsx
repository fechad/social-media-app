import axios from 'axios'
import Text from '../components/Text'
import Button from '../components/Button'
import React, { useContext, useEffect, useState } from 'react'
import { environment } from '../environments/environment'
import { AuthContext } from '../Auth'
import '../styles/UserProfile.scss'
import { FiEdit } from 'react-icons/fi'
import { MdUpload } from 'react-icons/md'
import LeftSidePane from '../components/LeftSidePane'
import RightSidePane from '../components/RightSidePane'
import NavBar from '../components/NavBar'
import Tabs from '../components/Tabs'
import Post from '../components/Post'
import Modal from '../components/Modal'
import TextInput from '../components/TextInput'

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

    const [clicked, setClick] = useState(0);
    const {currentUser} = useContext(AuthContext);
    const retrieveInfos = () => {
        axios.get(`${environment.serverUrl}/database/users/MyInfos/${currentUser.email}`).then((infos)=>{
            getData(infos.data[0]);
            axios.get(`${environment.serverUrl}/database/friends/${infos.data[0].email}`).then((friends)=>{
                setFriends(friends.data);
            })
            axios.get(`${environment.serverUrl}/database/users/favorite/${currentUser.email}`).then((favorite)=>{
                setFavorite(favorite.data);
            })
            axios.get(`${environment.serverUrl}/database/users/post/${infos.data[0].handle}`).then((posts)=>{
                setPost(posts.data);
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

        if(post.post_id === '0') return '';

        else if(faveList.filter(item=>item.post_id === post.post_id).length > 0) {

            return (
                <Post key = {index} handle={post.handle} media={post.media} username={data.account_name} text_message={post.text_message} likes={post.likes} date={post.date} isVideo={post.isVideo} postId = {post.post_id} nbComments = {post.comments_number} isFaved = {true} isLiked = {false}></Post>
            );
        }
        return (
            <Post key = {index} handle={post.handle} media={post.media} username={data.account_name} text_message={post.text_message} likes={post.likes} date={post.date} isVideo={post.isVideo} postId = {post.post_id} nbComments = {post.comments_number} isFaved = {false} isLiked = {false}></Post>
        );
    });

    const starred = postList.map((post, index) => {
        if(post.post_id === '0') return '';

        else if(faveList.filter(item=>item.post_id === post.post_id).length > 0) {

            return (
                <Post key = {index + 'fvrjbvrebvrebvberibv'} handle={post.handle} media={post.media} username={data.account_name} text_message={post.text_message} likes={post.likes} date={post.date} isVideo={post.isVideo} postId = {post.post_id} nbComments = {post.comments_number} isFaved = {true} isLiked = {false}></Post>
            );
        }
        return '';
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

    const uploadFile = () => {
        const file = (document.getElementById('download') as HTMLInputElement).files![0];
        const reader = new FileReader();
        console.log(document.getElementById('test'));
        reader.addEventListener('load', ()=>{
          document.getElementById('pic')?.setAttribute('src', reader.result!.toString())
        });
        console.log(document.getElementById('test'));
        reader.readAsDataURL(file);
      }
    // otherwise it makes an infinite amount of get request
    // eslint-disable-next-line react-hooks/exhaustive-deps 
    useEffect(()=>{retrieveInfos()}, [clicked]);
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
               <Modal 
                    triggerElement={ <Button text='edit' icon = {<FiEdit color = 'white'/>}></Button>} 
                    title={'Profile editing'} 
                    modalWidth={'536px'} 
                    modalHeight={'608px'}
                    primary = {'Apply'}
                    primaryFct = {()=>{console.log('future fct')}}
                >
                    <div className='patate'>
                        <div className='horizontal height-centered'>
                            <img id = 'pic' src={`${environment.serverUrl}/database/image/${currentUser.email}`} alt="" width='72px' height='72px'/>
                            <input type = 'file' id = 'download' onChange={()=>{uploadFile()}}></input>
                            <label htmlFor="download" style = {{height: '32px', borderRadius: '8px', width: '232px'}}>
                                <p className = 'upload'> Change profile picture </p>
                                <MdUpload size={20}/>
                            </label>
                        </div>
                        <div className='horizontal name-container'>
                            <Text content='Name:' type = 'H3'></Text>
                            <TextInput width='360px' height = '32px' type = 'text' label = ''></TextInput>
                        </div>
                        <div className='horizontal bio-holder'>
                            <Text content='Bio:' type = 'H3'></Text>
                            <textarea style = {{width:'360px', height:'256px', resize: 'none'}} placeholder='Write a short bio !' maxLength={512} />
                        </div>
                    </div>
                </Modal>
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
            <Tabs pages={[publications(), favorites()]} titleFct = {()=>{setClick(clicked + 1)}}></Tabs>
            <div className ='RightSideContainer'><RightSidePane /></div>
        </div>
    )
}

export default UserProfile