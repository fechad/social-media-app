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
import Modal from '../components/Modal';
import Tabs from '../components/Tabs';
import TextInput from '../components/TextInput';
import { FaSearch } from 'react-icons/fa';
import UserSearchPreview from '../components/UserSearchPreview';
import { useNavigate } from 'react-router-dom';


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

    let navigate = useNavigate();

    const {currentUser} = useContext(AuthContext);
    const retrieveInfos = async () => {
        await axios.get(`${environment.serverUrl}/database/users/MyInfos/${currentUser.email}`).then((infos)=>{
            getData(infos.data[0]);
        })

        await axios.get(`${environment.serverUrl}/database/users/MyFriends/${currentUser.email}`).then((infos)=>{
            if(infos.data[0]) getFriends(infos.data[0]);
        })

        await axios.get(`${environment.serverUrl}/database/users/MyBlockedFriends/${currentUser.email}`).then((infos)=>{
            if(infos.data[0]) getBlockedFriends(infos.data[0]);
        })

        await axios.get(`${environment.serverUrl}/database/users/MyMutedFriends/${currentUser.email}`).then((infos)=>{
            if(infos.data[0]) getMutedFriends(infos.data[0]);
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

    const [friends, getFriends] = useState({
        "handle" : 'none',
        "list": 'none'
    });

    const [blockedFriends, getBlockedFriends] = useState({
        "handle" : 'none',
        "list": 'none'
    });

    const [mutedFriendList, getMutedFriends] = useState({
        "handle" : 'none',
        "list": 'none'
    });

    function friendsList(){

        return(
          <div>
            <div className='ModalSearchArea'> 
                <TextInput icon={<FaSearch size={25} color={'#767676'}/>} width='218px' label='' placeHolder='Search Chymera' specialFtc={myFriends}/>
            </div>
            <div>
                {
                    friends.list.split(' ').map((data: any)=>{
                        return(
                            
                            <div className='MatchingUsersContainer' onClick={() => {navigate(`/User/Profile/${data.handle}`, { replace: true }); window.location.reload();}}>
                                <UserSearchPreview  profile_pic={data.profile_pic} account_name={data.account_name} handle={data.handle} />
                            </div> 
                        )           
                    })
                }
            </div>
          </div>
        )
    }

    const myFriends = () => {

    }

    function BlockedFriends(){

        return(
            <div>
              <div className='ModalSearchArea'> 
                  <TextInput icon={<FaSearch size={25} color={'#767676'}/>} width='218px' label='' placeHolder='Search Chymera' specialFtc={myFriends}/>
              </div>
              <div>
                  {
                      blockedFriends.list.split(' ').map((data: any)=>{
                          return(
                              
                              <div className='MatchingUsersContainer' onClick={() => {navigate(`/User/Profile/${data.handle}`, { replace: true }); window.location.reload();}}>
                                  <UserSearchPreview  profile_pic={data.profile_pic} account_name={data.account_name} handle={data.handle} />
                              </div> 
                          )           
                      })
                  }
              </div>
            </div>
          )
    }

    const myBlockedFriends = () => {

    }

    function mutedFriends(){

        return(
            <div>
              <div className='ModalSearchArea'> 
                  <TextInput icon={<FaSearch size={25} color={'#767676'}/>} width='218px' label='' placeHolder='Search Chymera' specialFtc={myFriends}/>
              </div>
              <div>
                  {
                      mutedFriendList.list.split(' ').map((data: any)=>{
                          return(
                              
                              <div className='MatchingUsersContainer' onClick={() => {navigate(`/User/Profile/${data.handle}`, { replace: true }); window.location.reload();}}>
                                  <UserSearchPreview  profile_pic={data.profile_pic} account_name={data.account_name} handle={data.handle} />
                              </div> 
                          )           
                      })
                  }
              </div>
            </div>
          )
    }

    const myMutedFriends = () => {

    }

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
                    <div >
                        <Modal 
                            triggerElement={<div className='ManagementOptions'> <FiUsers size={20} /> <Text type='H3' content='Manage friends' /> </div>}
                            title='Friends manager'
                            modalWidth='1088px'
                            modalHeight='680px'
                        >
                            <div style={{width: '900px', marginLeft: '94px'}}>
                                <Tabs pages={[friendsList(), BlockedFriends(), mutedFriends()]} tabs={`Friend list(); Blocked friends(); Muted friends()`} />
                            </div>
                        </Modal>
                    </div>
                    <div >
                        <Modal 
                            triggerElement={<div className='ManagementOptions'> <AiOutlineLock size={20} /> <Text type='H3' content='Change password' /> </div>}
                            title='Change password ?'
                            modalWidth='640px'
                            modalHeight='408px'
                            primary='Apply'
                            primaryFct={() => { console.log('Applied password change')}}
                        >
                            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', width: 'inherit', marginTop: '24px'}} >
                                <div style={{display: 'flex', gap: '20px', alignItems: 'center'}}>
                                    <Text content='Current password:' type='H3'/>
                                    <TextInput width='320px' height='32px' type='password' label=''/>
                                </div>
                                <div style={{display: 'flex', gap: '44px', alignItems: 'center'}}>
                                    <Text content='New password:' type='H3'/>
                                    <TextInput width='320px' height='32px' type='password' label=''/>
                                </div>
                                <div style={{display: 'flex', gap: '20px', alignItems: 'center'}}>
                                    <Text content='Confirm password:' type='H3'/>
                                    <TextInput width='320px' height='32px' type='password' label=''/>
                                </div>
                            </div>
                        </Modal>
                    </div>

                    <div >
                        <Modal 
                            triggerElement={<div className='ManagementOptions'> <BiEnvelope size={20} /> <Text type='H3' content='Change email address' /> </div>}
                            title='Change email ?'
                            modalWidth='640px'
                            modalHeight='352px'
                            primary='Validate'
                            primaryFct={() => { console.log('Validated email change')}}
                        >
                            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', width: 'inherit', marginTop: '20px'}} >
                                <div style={{display: 'flex', gap: '20px', alignItems: 'center'}}>
                                    <Text content='Current email:' type='H3'/>
                                    <TextInput width='320px' height='32px' type='text' label=''/>
                                </div>
                                <div style={{display: 'flex', gap: '44px', alignItems: 'center'}}>
                                    <Text content='New email:' type='H3' />
                                    <TextInput width='320px' height='32px' type='text' label=''/>
                                </div>
                            </div>
                        </Modal>
                    </div>
                </div>
                <div >
                    <Modal 
                        triggerElement={<div className='Irreversible'> <FiTrash2 size={20} color='#FF0000'/> <Text type='H3' content='Delete account' color='#FF0000'/> </div>}
                        title='Change email ?'
                        modalWidth='640px'
                        modalHeight='352px'
                        destructive={true}
                        primary='Delete'
                        primaryFct={() => { console.log('Account deleted')}}
                    >
                        <div style={{display: 'flex', flexDirection: 'column', gap: '8px', width: 'inherit', marginTop: '-4px'}} >
                            <div style={{display: 'flex', width: '544px', alignItems: 'center', marginLeft: '56px'}}>
                                <Text content='Deleting account is irreversible and immediate. Please enter your account password to validate this request.' type='H3'/>
                            </div>
                            <div style={{display: 'flex', gap: '44px', alignItems: 'center', marginLeft: '56px'}}>
                                <Text content='Enter password:' type='H3' />
                                <TextInput width='320px' height='32px' type='password' label=''/>
                            </div>
                        </div>
                    </Modal>
                </div>
            </div>
            <div className ='RightSideContainer'><RightSidePane /></div>
        </div>
    )
}

export default UserSettings