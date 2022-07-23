import React, { useEffect, useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import '../styles/LeftSidePane.scss'
import TextInput from './TextInput'
import Text from './Text'
import ChatPreview from './ChatPreview'
import { environment } from '../environments/environment'
import UserSearchPreview from './UserSearchPreview'

function LeftSidePane() {

    //TOTO: Faire une table conversations dans la DB
    const [users, setUsers] = useState([{
        account_name: '',
        handle: '',
        profile_pic: ''
    }])
    const [searching, setSearch] = useState(false);
    const [firstSearch, setFirstSearch] = useState(true);
    
    const getUsers = async () => {
        const inputText = (document.getElementsByClassName('inputContainer')[0].firstChild as HTMLInputElement).value;
        await fetch(`${environment.serverUrl}/database/users/Search/${inputText}`, {
            method: 'GET',
          }).then(async (result) => {
            setFirstSearch(false);
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
        setFirstSearch(true);
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
        document.getElementsByClassName('inputContainer')[0].firstChild?.addEventListener('click', () => {
            setSearch(true);
        });
        (document.getElementsByClassName('inputContainer')[0].firstChild as HTMLInputElement).addEventListener('keydown', (event) =>{
            if(event.key === 'Enter'){
                getUsers();
            }
        })
    }, []);

    useEffect(() =>{
        
      },
      [users]
    );

  return (
    <section className='LeftSidePaneContainer' onMouseLeave={() => reset()}>
        <div className='SearchArea'>
            <img src='/logo.svg' alt="" height="87"width="50"></img>
            <TextInput icon={<FaSearch size={25} color={'#767676'}/>} width='218px' label='' placeHolder='Search Chymera' specialFtc={getUsers}/>
        </div>
        <div className={searching && !firstSearch ? '' : `LeftSidePaneTittle`}>
            {
                searching && !firstSearch ? '' : <Text type='H2' content='Conversations'/>
            }
        </div>
        <div className='ConversationsArea'>
            {
                searching && !firstSearch ? 

                users.map((match)=>{
                    return(
                         
                         <div className='MatchingUsersContainer'>
                            <UserSearchPreview  profile_pic={match.profile_pic} account_name={match.account_name} handle={match.handle} />
                        </div> 
                    )           
                })

                : 

                conversations.map((conversation)=>{
                    return(
                         
                         <div className='ConversationContainer'>
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