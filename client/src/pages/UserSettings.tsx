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
import RadioButtonPair from '../components/RadioButtonPair';


interface data {
    email: string,
    handle : string,
    profile_pic : string,
    age : string,
    account_name : string,
    private_account : string,
    bio : string,
    news_options : string,
    local_news : string,
    french_language : string,
}

const UserSettings = () => {

    
    const {currentUser} = useContext(AuthContext);
    const retrieveInfos = async () => {
        await axios.get(`${environment.serverUrl}/database/users/MyInfos/${currentUser.email}`).then((infos)=>{
            getData(infos.data[0]);
        })
    }

    function getCheckboxUpdate():string {
        let result = '';
        for(let index = 0; index < 9; index ++){
            if((document.getElementsByClassName('CheckboxesContainer')[0].childNodes[index].firstChild as HTMLElement).classList.contains('Checked'))
            result += `${(document.getElementsByClassName('CheckboxesContainer')[0].childNodes[index].lastChild as HTMLElement).innerText} `;
        }
        result.trim();
        if(result.split(' ').length === 11) result = 'All'

        return result;
    }

    function getRadiosUpdate(): string[]{
        const result = ['', '']
        if(!document.getElementById('Public')?.firstElementChild?.nextElementSibling?.firstElementChild?.classList.contains('Checked')) result[0] = 'false';
        else result[0] = 'true';

        if(!document.getElementById('English')?.firstElementChild?.nextElementSibling?.firstElementChild?.classList.contains('Checked')) result[1] = 'false';
        else result[1] = 'true';

        return result;
    }


    async function updateDB() {
        await fetch(`${environment.serverUrl}/database/users/${currentUser.email}`, {
            method: 'PATCH',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
              "private_account" : getRadiosUpdate()[0],
              "news_options" : getCheckboxUpdate(),
              "french_language" : getRadiosUpdate()[1],
            }),
          }).then(() =>{
                window.location.reload();
          })
    }

    const [data, getData] = useState({
        "email": 'none',
        "handle" : 'none',
        "profile_pic" : 'none',
        "age" : 'none',
        "account_name" : 'none',
        "private_account" : false,
        "bio" : 'none',
        "news_options" : 'none',
        "local_news" : 'none',
        "french_language" : false, 
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps 
    useEffect(()=>{ retrieveInfos(); console.log()}, []);

    return (
        <div>
            <div className='LeftSideContainer'><LeftSidePane /></div>
            <NavBar selection='' />
            <div className='SettingsPageContainer'>
                <div className='AccountStatus' >
                    <Text type='H2' content='Account status' />
                    <RadioButtonPair key={`${data.private_account}`} firstText='Public' secondText='Private' firstChecked={!data.private_account} />
                </div>
                <div className='Language' >
                    <Text type='H2' content='Language'/>
                    <RadioButtonPair  key={`${data.french_language}`}  firstText='English' secondText='Français' firstChecked={!data.french_language} />
                </div>
                <div className='NewsPreference'>
                    <Text type='H2' content='News preferences'/>
                    <div className='CheckboxesContainer' key={data.news_options} >
                        <Checkbox text='Sports' alreadyChecked={data.news_options.includes('Sports') || data.news_options.includes('All') ? true : false}/>
                        <Checkbox text='Finance' alreadyChecked={data.news_options.includes('Finance') || data.news_options.includes('All') ? true : false}/>
                        <Checkbox text='Technology' alreadyChecked={data.news_options.includes('Technology') || data.news_options.includes('All') ? true : false}/>
                        <Checkbox text='Arts' alreadyChecked={data.news_options.includes('Arts') || data.news_options.includes('All') ? true : false}/>
                        <Checkbox text='Cinema' alreadyChecked={data.news_options.includes('Cinema') || data.news_options.includes('All') ? true : false}/>
                        <Checkbox text='Food' alreadyChecked={data.news_options.includes('Food') || data.news_options.includes('All') ? true : false}/>
                        <Checkbox text='Odd facts' alreadyChecked={data.news_options.includes('Odd facts') || data.news_options.includes('All') ? true : false}/>
                        <Checkbox text='Politics' alreadyChecked={data.news_options.includes('Politics') || data.news_options.includes('All') ? true : false}/>
                        <Checkbox text='Game' alreadyChecked={data.news_options.includes('Game') || data.news_options.includes('All') ? true : false}/>
                    </div>
                </div>
                <div className='Buttons'>
                    <Button text='Cancel' color='#FFBBBB' fct={() => window.location.reload()}/>
                    <Button text='Save' fct={updateDB}/>
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