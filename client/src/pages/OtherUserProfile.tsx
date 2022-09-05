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
import { MdPersonAddAlt } from 'react-icons/md'
import Tabs from '../components/Tabs'
import { AuthContext } from '../Auth'
import Modal from '../components/Modal'
import TextInput from '../components/TextInput'
import { FaSearch } from 'react-icons/fa'

const OtherUserProfile = () => {

    const {handle} = useParams();

    const [searching, setSearch] = useState(false);

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
            axios.get(`${environment.serverUrl}/database/users/liked/${currentUser.email}`).then((posts)=>{
                if(posts.data[0]) setLiked(posts.data[0].posts);
                else setLiked('');
            });
            axios.get(`${environment.serverUrl}/database/users/MyFriends/${infos.data[0].email}`).then((friends)=>{
                setFriends(friends.data);
            });
            axios.get(`${environment.serverUrl}/database/users/MyFriends/${currentUser.email}`).then((friends)=>{
                setUserFriends(friends.data);
            });;
            axios.get(`${environment.serverUrl}/database/users/favorite/${currentUser.email}`).then((favorite)=>{
                setFavorite(favorite.data);
            });
            axios.get(`${environment.serverUrl}/database/users/post/${infos.data[0].handle}`).then((posts)=>{
                setPost(posts.data);
            });
           
        })  
    }

    const friends = friendsList.map((friend, index) => {
        if(friend.handle !== 'none' && userFriendsList.filter(item => item.handle === friend.handle).length > 0) {
            return (
                <img className = 'friends-pic' key = {`${friend.handle}`} src={`${environment.serverUrl}/database/image/${friend.handle}`} alt="" width='32px' height = '32px'/>
            )
        } else return '';
    });

    const moreFriends = friendsList.map((friend, index) => {
        if(friend.handle !== 'none' && userFriendsList.filter(item => item.handle === friend.handle).length > 0) {
            return (
                <div key = {friend.handle} className = 'friends-displayer'>
                    <img className = 'friends-pic'  src={`${environment.serverUrl}/database/image/${friend.handle}`} alt="" width='48px' height = '48px'/>
                    <Text content = {`${friend.account_name}`}></Text>
                </div>
            )
        } else return undefined;
    });

    const commonFriends = friendsList.map((friend)=>{
        if(friend.handle !== 'none' && userFriendsList.filter(item => item.handle === friend.handle).length > 0) return friend;
        else return undefined;
    });

    const [users, setUsers] = useState(commonFriends);

    const selectFriends = () => {
        const inputText = (document.getElementsByClassName('inputContainer')[1].firstChild as HTMLInputElement).value;
        const request = commonFriends.filter(item=>item?.account_name.toLowerCase().includes(`${inputText.toLowerCase()}`) || item?.handle.toLowerCase().includes(`${inputText.toLowerCase()}`));
        setUsers(request);
    }


    const posts = postList.map((post, index) => {
        let postLiked = liked.split(' ');
        let isLiked = (postLiked.filter(item=>item === post.post_id).length > 0);
        let isFaved = (faveList.filter(item=>item.post_id === post.post_id).length > 0);

        if(post.post_id === '0') return '';

        else{

            return (
                <Post key = {`${post.post_id}/${isLiked}/${isFaved}/${post.likes}`} handle={post.handle} media={post.media} username={data.account_name} text_message={post.text_message} likes={post.likes} date={post.date} isVideo={post.isVideo} postId = {post.post_id} nbComments = {post.comments_number} isFaved = {isFaved} isLiked = {isLiked}></Post>
            );
        }
    });

    const selected = users.map((user, index) => {
        return (
            <div key = {user?.handle} className = 'friends-displayer'>
                <img className = 'friends-pic'  src={`${environment.serverUrl}/database/image/${user?.handle}`} alt="" width='48px' height = '48px'/>
                <Text content = {`${user?.account_name}`}></Text>
            </div>
        )
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
    useEffect(()=>{
        (document.getElementsByClassName('inputContainer')[1].firstChild as HTMLInputElement).addEventListener('keyup', () =>{
            setSearch(true);
            let text = (document.getElementsByClassName('inputContainer')[1].firstChild as HTMLInputElement).value;
            if(text === ''){
                setSearch(false);
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
                        <img id = 'test' src={`${environment.serverUrl}/database/image/${data.email}`} alt="" width='72px' height='72px'/>
                        <div>
                            <div className='id-container'>
                                <Text content = {`${data.account_name}`} type = 'H3'></Text>
                                <Text content = {`${data.age} years old`} type = 'H3' color = 'rgba(0, 0, 0, 0.5)'></Text>
                            </div>
                            <Text content = {`@${data.handle}`} color = 'rgba(0, 0, 0, 0.5)' type='H3'></Text>
                        </div>
                    </div>
                <Button text='add' icon = {<MdPersonAddAlt color = 'white' size = '32px'/>}></Button>
                </div>
                <div className = 'bio-container'>
                    <Text content = {`${data.bio}`}></Text>
                </div>
                <div className ='avatar-list'>
                    <div className = 'friends'>
                        <Text content = 'Common Friends' type = 'H2'></Text>
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
                        <Text content = 'Common Groups' type = 'H2'></Text>
                        <div className='friends-display'>
                            {friends}
                            <p className = 'see-more' style = {{color: '#cccccc', cursor: 'not-allowed'}}>see more</p>
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