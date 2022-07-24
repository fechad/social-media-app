import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../Auth';
import LeftSidePane from '../components/LeftSidePane';
import NavBar from '../components/NavBar';
import RightSidePane from '../components/RightSidePane';
import { environment } from '../environments/environment';
import Text  from '../components/Text'
import Checkbox from '../components/Checkbox';
import Button from '../components/Button';
import { FiTrash2, FiUsers } from 'react-icons/fi';
import { AiOutlineLock } from 'react-icons/ai';
import { BiEnvelope } from 'react-icons/bi'
import '../styles/UserSettings.scss'
import RadioButton from '../components/RadioButton';
import RadioButtonPair from '../components/RadioButtonPair';

const UserSettings = () => {

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
        axios.get(`${environment.serverUrl}/database/users/MyInfos/${currentUser.email}`).then((infos)=>{
            getData(infos.data[0]);
        })
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps 
    useEffect(()=>{retrieveInfos()}, []);

    return (
        <div>
            <div className='LeftSideContainer'><LeftSidePane /></div>
            <NavBar selection='' />
            <div className='SettingsPageContainer'>
                <div className='AccountStatus'>
                    <Text type='H2' content='Account status'/>
                    <RadioButtonPair firstText='Public' secondText='Private' firstChecked={data.private_account === 'true' ? false : true} />
                </div>
                <div className='Language'>
                    <Text type='H2' content='Language'/>
                    <RadioButtonPair firstText='English' secondText='français' firstChecked={data.french_language === 'true' ? false : true} />
                </div>
                <div className='NewsPreference'>
                    <Text type='H2' content='News preferences'/>
                    <div className='CheckboxesContainer'>
                        <Checkbox text='Sports'/>
                        <Checkbox text='Finance'/>
                        <Checkbox text='Technology'/>
                        <Checkbox text='Arts'/>
                        <Checkbox text='Cinema'/>
                        <Checkbox text='Food'/>
                        <Checkbox text='Odd facts'/>
                        <Checkbox text='Politics'/>
                        <Checkbox text='Game'/>
                    </div>
                </div>
                <div className='Buttons'>
                    <Button text='Save' />
                    <Button text='Default settings' />
                </div>
                <div className='Management'>
                    <div className='ManagementOptions'>
                        <FiUsers size={20} />
                        <Text type='H3' content='Manage friends' />
                    </div>
                    <div className='ManagementOptions'>
                        <AiOutlineLock size={20} />
                        <Text type='H3' content='Change password' />
                    </div>
                    <div className='ManagementOptions'>
                        <BiEnvelope size={20} />
                        <Text type='H3' content='Change email address' />
                    </div>
                </div>
                <div className='Irreversible'>
                    <FiTrash2 size={20} color='#FF0000'/>
                    <Text type='H3' content='Delete account' color='#FF0000'/>
                </div>
            </div>
            <div className ='RightSideContainer'><RightSidePane /></div>
        </div>
    )
}

export default UserSettings