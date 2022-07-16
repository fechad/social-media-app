import axios from 'axios'
import Text from '../components/Text'
import React, { useContext, useEffect, useState } from 'react'
import { environment } from '../environments/environment'
import { AuthContext } from '../Auth'
import '../styles/UserProfile.scss'

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
        "french_language" : 'false', });
    const {currentUser} = useContext(AuthContext);
    const retrieveInfos = () => {
        axios.get(`${environment.serverUrl}/database/users/${currentUser.email}`).then((infos)=>{
            getData(infos.data[0]);
        })
    }
    // otherwise it makes an infinite amount of get request
    // eslint-disable-next-line react-hooks/exhaustive-deps 
    useEffect(()=>{retrieveInfos()}, []);
    return (
        <div>
            <div className = 'infos-container'>
                <img id = 'test' src={`${environment.serverUrl}/database/image/${currentUser.email}`} alt="" width='100px' height='100px'/>
                <Text content = {`${data.account_name}`}></Text>
                <Text content = {`${data.handle}`}></Text>
            </div>
        </div>
    )
}

export default UserProfile