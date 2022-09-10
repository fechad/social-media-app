import React, { useEffect, useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import '../styles/LeftSidePane.scss'
import TextInput from './TextInput'
import Text from './Text'
import ChatPreview from './ChatPreview'
import { environment } from '../environments/environment'
import UserSearchPreview from './UserSearchPreview'
import { useNavigate } from 'react-router-dom'
import { screenRatio } from '../ScreenRatio'

function LeftSidePane() {

    let navigate = useNavigate();

    //TOTO: Faire une table conversations dans la DB
    const [users, setUsers] = useState([{
        account_name: '',
        handle: '',
        profile_pic: ''
    }])
    const [searching, setSearch] = useState(false);
    
    const getUsers = async () => {
        const inputText = (document.getElementsByClassName('inputContainer')[0].firstChild as HTMLInputElement).value;
        await fetch(`${environment.serverUrl}/database/users/Search/${inputText}`, {
            method: 'GET',
          }).then(async (result) => {
            await result.json()
            .then((data) =>{
                setUsers(data)
            })
        });
    };

    const reset = () => {
        setSearch(false);
        setUsers([{
            account_name: '',
            handle: '',
            profile_pic: ''
        }]);
    }
    
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [conversations, setConversations] = useState([{
        id: '10',
        photos: ['/logo.svg'],
        names: ['Oveezion Team'],
        latest: 'Welcome to ovvezion !',
        read: false,
        online: true,
    }])

    useEffect(() => {
        (document.getElementsByClassName('inputContainer')[0].firstChild as HTMLInputElement).addEventListener('keyup', () =>{
            setSearch(true);
            let text = (document.getElementsByClassName('inputContainer')[0].firstChild as HTMLInputElement).value;
            if(text === ''){
                reset();
            }
        })
    }, []);

    useEffect(() =>{
        
      },
      [users]
    );

  return (
    <section className='LeftSidePaneContainer'>
        <div className='SearchArea'>
            <img src='/logo.svg' alt="" style={{height: 'calc(Var(--adjustedRatio)*87px)', width: 'calc(Var(--adjustedRatio)*50px)'}}></img>
            <TextInput icon={<FaSearch size={25*(screenRatio.getRatio())} color={'#CCCCCC'}/>} width='218px' label='' placeHolder='Search Chymera' specialFtc={getUsers}/>
        </div>
        <div className={searching ? '' : `LeftSidePaneTittle`}>
            {
                searching ? '' : <Text type='H2' content='Conversations'/>
            }
        </div>
        <div className='ConversationsArea'>
            {
                searching ? 

                users.map((match, index: any)=>{
                    if(match.account_name !== '')
                    return(
                         
                         <div key={index} className='MatchingUsersContainer' onClick={() => {navigate(`/User/Profile/${match.handle}`, { replace: true }); window.location.reload();}}>
                            <UserSearchPreview  profile_pic={match.profile_pic} account_name={match.account_name} handle={match.handle} />
                        </div> 
                    );  
                    else return '';         
                })

                : 

                conversations.map((conversation, index: any)=>{
                    return(
                         
                         <div key={index} className='ConversationContainer'>
                            <ChatPreview  chatId={conversation.id} photos={conversation.photos} names={conversation.names} latest={conversation.latest} read={conversation.read} online={conversation.online}/>
                        </div> 
                    )           
                })
            }
        </div>
    </section>
  )
}

export default LeftSidePane