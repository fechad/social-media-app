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
import { FaSearch } from 'react-icons/fa'

const UserProfile = () => {
    let name: string;
    const [searching, setSearch] = useState(false);
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

    const [users, setUsers] = useState(friendsList);

    const [liked, setLiked] = useState('');


    const [clicked, setClick] = useState(0);
    const {currentUser} = useContext(AuthContext);
    const retrieveInfos = () => {
        axios.get(`${environment.serverUrl}/database/users/MyInfos/${currentUser.email}`).then((infos)=>{
            getData(infos.data[0]);
            axios.get(`${environment.serverUrl}/database/users/liked/${currentUser.email}`).then((posts)=>{
                setLiked(posts.data[0].posts);
            })
            axios.get(`${environment.serverUrl}/database/users/MyFriends/${infos.data[0].email}`).then((friends)=>{
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

        await fetch(`${environment.serverUrl}/database/users/${currentUser.email}`, {
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
        if(friend.handle !== 'none') {
            return (
                <img className = 'friends-pic' key = {friend.handle} src={`${environment.serverUrl}/database/image/${friend.handle}`} alt="" width='32px' height = '32px'/>
            )
        } else return '';
    });

    const moreFriends = friendsList.map((friend, index) => {
        if(friend.handle !== 'none') {
            return (
                <div key = {friend.handle} className = 'friends-displayer'>
                    <img className = 'friends-pic'  src={`${environment.serverUrl}/database/image/${friend.handle}`} alt="" width='48px' height = '48px'/>
                    <Text content = {`${friend.account_name}`}></Text>
                </div>
            )
        }  else return '';
    });


    const posts = postList.map((post, index) => {
        let postLiked = liked.split(' ');
        let isLiked = (postLiked.filter(item=>item === post.post_id).length > 0);
        let isFaved = (faveList.filter(item=>item.post_id === post.post_id).length > 0);


        if(post.post_id === '0') return '';

        else {

            return (
                <Post key={`${post.post_id}/${isLiked}/${isFaved}/${post.likes}`} handle={post.handle} media={post.media} username={data.account_name} text_message={post.text_message} likes={post.likes} date={post.date} isVideo={post.isVideo} postId = {post.post_id} nbComments = {post.comments_number} isFaved = {isFaved} isLiked = {isLiked}></Post>
            );
        }
    });

    const starred = postList.map((post, index) => {
        let isLiked = (liked.split(' ').filter(item=>item === post.post_id).length > 0);
        if(post.post_id === '0') return '';

        else if(faveList.filter(item=>item.post_id === post.post_id).length > 0) {

            return (
                <Post key={`${post.post_id}/${isLiked}/${true}/${post.likes}`} handle={post.handle} media={post.media} username={data.account_name} text_message={post.text_message} likes={post.likes} date={post.date} isVideo={post.isVideo} postId = {post.post_id} nbComments = {post.comments_number} isFaved = {true} isLiked = {isLiked}></Post>
            );
        }
        return '';
    });

    const selected = users.map((user, index) => {
        return (
            <div key = {user.handle} className = 'friends-displayer'>
                <img className = 'friends-pic'  src={`${environment.serverUrl}/database/image/${user.handle}`} alt="" width='48px' height = '48px'/>
                <Text content = {`${user.account_name}`}></Text>
            </div>
        )
    });

    const reset = () => {
        setSearch(false);
    }

    const selectFriends = () => {
        const inputText = (document.getElementsByClassName('inputContainer')[2].firstChild as HTMLInputElement).value;
        const request = friendsList.filter(item=>item.account_name.toLowerCase().includes(`${inputText.toLowerCase()}`) || item.handle.toLowerCase().includes(`${inputText.toLowerCase()}`));
        setUsers(request);
    }

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
    useEffect(()=>{retrieveInfos()}, [clicked]);
    useEffect(()=>{
        (document.getElementsByClassName('inputContainer')[2].firstChild as HTMLInputElement).addEventListener('keyup', () =>{
            setSearch(true);
            let text = (document.getElementsByClassName('inputContainer')[2].firstChild as HTMLInputElement).value;
            if(text === ''){
                reset();
            }
        })
    }, []);
    useEffect(()=>{}, [users, searching]);
    return (
        <div>
            <div className='LeftSideContainer'><LeftSidePane /></div>
            <NavBar selection='' />
            <div id = 'page-container'>
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
                        primaryFct = {()=>{updateUser()}}
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
                        <Text content = 'Friends List' type = 'H2'></Text>
                        <div className='friends-display'>
                            {friends}
                            <Modal 
                                triggerElement={ <p className = 'see-more'>see more</p>} 
                                title={'Friends list'} 
                                modalWidth={'300px'} 
                                modalHeight={'600px'}
                            >
                                <div>
                                    <TextInput icon={<FaSearch size={25} color={'#767676'}/>} width='218px' label='' placeHolder='Search friends' specialFtc={selectFriends}/>
                                    <div className = 'search-displayer' style={{margin: '24px'}}>
                                        {searching ? selected : moreFriends}
                                    </div>
                                </div>
                            </Modal>
                        </div>
                    </div>
                    <div className = 'friends'>
                        <Text content = 'Group List' type = 'H2'></Text>
                        <div className='friends-display'>
                            {friends}
                            <p className = 'see-more' style = {{color: '#cccccc', cursor: 'not-allowed'}}>see more</p>
                        </div>
                    </div>
                </div>
                <Tabs pages={[publications(), favorites()]} titleFct = {()=>{setClick(clicked + 1)}}></Tabs>
            </div>
            <div className ='RightSideContainer'><RightSidePane /></div>
        </div>
    )
}

export default UserProfile