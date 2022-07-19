import axios from 'axios'
import Text from '../components/Text'
import Button from '../components/Button'
import React, { useContext, useEffect, useState } from 'react'
import { environment } from '../environments/environment'
import { AuthContext } from '../Auth'
import '../styles/UserProfile.scss'
import { FiEdit } from 'react-icons/fi'

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
    }])
    const {currentUser} = useContext(AuthContext);
    const retrieveInfos = () => {
        axios.get(`${environment.serverUrl}/database/users/${currentUser.email}`).then((infos)=>{
            getData(infos.data[0]);
            axios.get(`${environment.serverUrl}/database/friends/${infos.data[0].handle}`).then((friends)=>{
                setFriends(friends.data);
            })
        })
    }
    const friends = friendsList.map((friend, index) => {
        return (
            <img className = 'friends-pic' key = {index} src={`${environment.serverUrl}/database/image/${friend.handle}`} alt="" width='32px' height = '32px'/>
        )
    })
    // otherwise it makes an infinite amount of get request
    // eslint-disable-next-line react-hooks/exhaustive-deps 
    useEffect(()=>{retrieveInfos()}, []);
    return (
        <div>
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
            <div className = 'friends'>
                <Text content = 'Friends List' type = 'H2'></Text>
                <div className='friends-display'>
                    {friends}
                    <Text content = 'see more' color = '#0047FF'></Text>
                </div>
            </div>
        </div>
    )
}

export default UserProfile