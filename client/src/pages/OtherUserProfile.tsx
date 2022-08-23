import axios from 'axios'
import Text from '../components/Text'
import Button from '../components/Button'
import React, {useContext, useEffect, useState } from 'react'
import { environment } from '../environments/environment'
import '../styles/OtherUserProfile.scss'
import { FiLock } from 'react-icons/fi'
import LeftSidePane from '../components/LeftSidePane'
import RightSidePane from '../components/RightSidePane'
import NavBar from '../components/NavBar'
import { useParams } from 'react-router-dom'
import Post from '../components/Post'
import Modal from '../components/Modal'
import { MdPersonAddAlt, MdUpload } from 'react-icons/md'
import TextInput from '../components/TextInput'
import Tabs from '../components/Tabs'
import { AuthContext } from '../Auth'

const OtherUserProfile = () => {

    const {handle} = useParams();

    let name: string;

    const [data, getData] = useState({
        "email": 'none',
        "handle" : handle,
        "profile_pic" : 'none',
        "age" : 'none',
        "account_name" : 'none',
        "private_account" : false,
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

    const [userFriendsList, setUserFriends] = useState([{
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

    const [liked, setLiked] = useState('');

    const {currentUser} = useContext(AuthContext);


    const [clicked, setClick] = useState(0);
    const retrieveInfos = () => {
        axios.get(`${environment.serverUrl}/database/users/${handle}`).then((infos)=>{
            getData(infos.data[0]);
            axios.get(`${environment.serverUrl}/database/users/liked/${infos.data[0].email}`).then((posts)=>{
                if(posts.data[0]) setLiked(posts.data[0].posts);
                else setLiked('');
            });
            axios.get(`${environment.serverUrl}/database/friends/${infos.data[0].email}`).then((friends)=>{
                setFriends(friends.data);
            });
            axios.get(`${environment.serverUrl}/database/friends/${currentUser.email}`).then((friends)=>{
                setUserFriends(friends.data);
            });;
            axios.get(`${environment.serverUrl}/database/users/favorite/${infos.data[0].email}`).then((favorite)=>{
                setFavorite(favorite.data);
            });
            axios.get(`${environment.serverUrl}/database/users/post/${infos.data[0].handle}`).then((posts)=>{
                setPost(posts.data);
            });
           
        })  
    }

    const sendPhoto = () =>{
       if((document.getElementById('download') as HTMLInputElement).files![0]) {
            const form = new FormData();
            name = `${Date.now()}${Math.round(Math.random() * 1000)}.png`
            form.append('image', (document.getElementById('download') as HTMLInputElement).files![0], name); 
            axios.post(`${environment.serverUrl}/database/image`, form);
            axios.delete(`${environment.serverUrl}/removePic/${data.profile_pic.replace('./assets/profile-pics/', '')}`);
       }
    }

    const uploadFile = () => {
        const file = (document.getElementById('download') as HTMLInputElement).files![0];
        const reader = new FileReader();
        reader.addEventListener('load', ()=>{
          document.getElementById('pic')?.setAttribute('src', reader.result!.toString())
        });
        reader.readAsDataURL(file);
    }

    async function updateUser() {
        sendPhoto();

        const accName = ((document.getElementsByClassName('name-container')[0]).getElementsByClassName('inputContainer')[0].firstChild as HTMLInputElement).value;
        const accNamePH = ((document.getElementsByClassName('name-container')[0]).getElementsByClassName('inputContainer')[0].firstChild as HTMLInputElement).placeholder;

        const bio = (document.getElementsByClassName('bio-holder')[0].getElementsByTagName('textarea')[0]).value;
        const bioPH = (document.getElementsByClassName('bio-holder')[0].getElementsByTagName('textarea')[0]).placeholder;

        const profileUpdateInfos = {
            "photo": name ? `./assets/profile-pics/${name}` : data.profile_pic,
            "accountName" : accName ? accName : accNamePH,
            "bio" : bio ? bio : bioPH,
        }

        await fetch(`${environment.serverUrl}/database/users/${data.email}`, {
            method: 'PATCH',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                "profile_pic" : `${profileUpdateInfos.photo}`,
                "account_name" : `${profileUpdateInfos.accountName}`,
                "bio" : `${profileUpdateInfos.bio}`
            }),
          }).then(() =>{
                window.location.reload();
          })
    }


    const friends = friendsList.map((friend, index) => {
        if(friend.handle !== 'none' && userFriendsList.filter(item => item.handle === friend.handle).length > 0) {
            return (
                <img className = 'friends-pic' key = {index} src={`${environment.serverUrl}/database/image/${friend.handle}`} alt="" width='32px' height = '32px'/>
            )
        } else return '';
    });

    const posts = postList.map((post, index) => {
        let postLiked = liked.split(' ');
        let isLiked = (postLiked.filter(item=>item === post.post_id).length > 0);
        let isFaved = (faveList.filter(item=>item.post_id === post.post_id).length > 0);

        if(post.post_id === '0') return '';

        else{

            return (
                <Post key = {index} handle={post.handle} media={post.media} username={data.account_name} text_message={post.text_message} likes={post.likes} date={post.date} isVideo={post.isVideo} postId = {post.post_id} nbComments = {post.comments_number} isFaved = {isFaved} isLiked = {isLiked}></Post>
            );
        }
    });

    function publications(){
        if(!data.private_account || userFriendsList.filter(item=>item.handle === data.handle).length > 0) return (
            <div>
                {posts}
            </div>
        )
        else return (
            <div className='private-container'>
                <FiLock size='200px' color = '#cccccc'/>
                <Text type = 'H3' content={`This account is private`}></Text>
                <Text type = 'H3' content={`To see account activities ask ${data.account_name} to be friends.`}></Text>
            </div>
        )
    }

    // otherwise it makes an infinite amount of get request
    // eslint-disable-next-line react-hooks/exhaustive-deps 
    useEffect(()=>{retrieveInfos()}, [clicked]);
    return (
        <div>
            <div className='LeftSideContainer'><LeftSidePane /></div>
            <NavBar selection='' />
            <div id = 'page-container'>
                <div className = 'infos-container'>
                    <div className = 'left-infos'>
                        <img id = 'test' src={`${environment.serverUrl}/database/image/${data.email}`} alt="" width='72px' height='72px'/>
                        <div>
                            <div className='id-container'>
                                <Text content = {`${data.account_name}`} type = 'H3'></Text>
                                <Text content = {`${data.age} years old`} type = 'H3' color = 'rgba(0, 0, 0, 0.5)'></Text>
                            </div>
                            <Text content = {`@${data.handle}`} color = 'rgba(0, 0, 0, 0.5)' type='H3'></Text>
                        </div>
                    </div>
                    <Modal 
                        triggerElement={ <Button text='add' icon = {<MdPersonAddAlt color = 'white' size = '32px'/>}></Button>} 
                        title={'Profile editing'} 
                        modalWidth={'536px'} 
                        modalHeight={'608px'}
                        primary = {'Apply'}
                        primaryFct = {()=>{updateUser()}}
                    >
                        <div className='patate'>
                            <div className='horizontal height-centered'>
                                <img id = 'pic' src={`${environment.serverUrl}/database/image/${data.email}`} alt="" width='72px' height='72px'/>
                                <input type = 'file' id = 'download' onChange={()=>{uploadFile()}}></input>
                                <label htmlFor="download" style = {{height: '32px', borderRadius: '8px', width: '232px'}}>
                                    <p className = 'upload'> Change profile picture </p>
                                    <MdUpload size={20}/>
                                </label>
                            </div>
                            <div className='horizontal name-container'>
                                <Text content='Name:' type = 'H3'></Text>
                                <TextInput width='360px' height = '32px' type = 'text' label = '' placeHolder={data.account_name}></TextInput>
                            </div>
                            <div className='horizontal bio-holder'>
                                <Text content='Bio:' type = 'H3'></Text>
                                <textarea style = {{width:'360px', height:'256px', resize: 'none'}} placeholder={data.bio} maxLength={512}/>
                            </div>
                        </div>
                    </Modal>
                </div>
                <div className = 'bio-container'>
                    <Text content = {`${data.bio}`}></Text>
                </div>
                <div className ='avatar-list'>
                    <div className = 'friends'>
                        <Text content = 'Common Friends' type = 'H2'></Text>
                        <div className='friends-display'>
                            {friends}
                            <p className = 'see-more'>see more</p>
                        </div>
                    </div>
                    <div className = 'friends'>
                        <Text content = 'Common Groups' type = 'H2'></Text>
                        <div className='friends-display'>
                            {friends}
                            <p className = 'see-more'>see more</p>
                        </div>
                    </div>
                </div>
                <Tabs pages={[publications()]} tabs = 'Publications' titleFct = {()=>{setClick(clicked + 1)}}></Tabs>
            </div>
            <div className ='RightSideContainer'><RightSidePane /></div>
        </div>
    )
}

export default OtherUserProfile