import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { environment } from '../environments/environment'
import { AuthContext } from '../Auth'

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
        console.log('loaded');
        axios.get(`${environment.serverUrl}/database/users/${currentUser.email}`).then((infos)=>{
            getData(infos.data[0]);
            console.log(infos.data[0]);
        })
    }
    // otherwise it makes an infinite amount of get request
    // eslint-disable-next-line react-hooks/exhaustive-deps 
    useEffect(()=>{retrieveInfos()}, []);
    return (
        <div>
            <img src={data.profile_pic} alt="" />
            {data.email}
        </div>
    )
}

export default UserProfile