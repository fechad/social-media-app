import axios from 'axios'
import Text from '../components/Text'
import Button from '../components/Button'
import React, {useEffect, useState } from 'react'
import { environment } from '../environments/environment'
import '../styles/OtherUserProfile.scss'
import { FiEdit } from 'react-icons/fi'
import LeftSidePane from '../components/LeftSidePane'
import RightSidePane from '../components/RightSidePane'
import NavBar from '../components/NavBar'
import { useParams } from 'react-router-dom'

const OtherUserProfile = () => {

    const {handle} = useParams();

    const [data, getData] = useState({
        "email": 'none',
        "handle" : handle,
        "profile_pic" : 'none',
        "age" : 'none',
        "account_name" : 'none',
        "private_account" : 'false',
        "bio" : 'none',
        "news_options" : 'All',
        "local_news" : 'false',
        "french_language" : 'false', 
    });

    const retrieveInfos = () => {
        axios.get(`${environment.serverUrl}/database/users/${handle}`).then((infos)=>{
            getData(infos.data[0]);
        })
    };
    // otherwise it makes an infinite amount of get request
    // eslint-disable-next-line react-hooks/exhaustive-deps 
    useEffect(()=>{retrieveInfos()}, []);
    return (
        <div>
            <div className='LeftSideContainer'><LeftSidePane /></div>
            <NavBar selection='' />
            <div className = 'infos-container'>
                <div className = 'left-infos'>
                    <img id = 'test' src={`${environment.serverUrl}/image/${data.profile_pic.replace('./assets/profile-pics/', '')}`} alt="" width='72px' height='72px'/>
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
            </div>
            <div className ='RightSideContainer'><RightSidePane /></div>
        </div>
    )
}

export default OtherUserProfile