import React, { useContext, useEffect, useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import '../styles/LeftSidePane.scss'
import TextInput from './TextInput'
import Text from './Text'
import ChatPreview from './ChatPreview'
import { environment } from '../environments/environment'
import UserSearchPreview from './UserSearchPreview'
import { useNavigate, useParams } from 'react-router-dom'
import { DataContext } from '../DataContext'

function LeftSidePane() {

    let navigate = useNavigate();
    const { id } = useParams();

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

    const { chats } = useContext(DataContext);
    const { data } = useContext(DataContext);
    
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [conversations, setConversations] = useState([{
        id: '',
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
        let convos: any = [];

        chats.forEach((chat: any) => {
            let handles: string[] = chat.members.split(';');
            handles = handles.filter(name => name !== data.handle);

            let messages = chat.message_log.split(';');
            convos.push({
                id: chat.chatid,
                photos: ['/logo.svg'],
                names: handles,
                latest: messages[messages.length-1],
                read: false,
                online: true,
            })
        });

        setConversations(convos);
    }, []);

    useEffect(() =>{
        
      },
      [users]
    );

  return (
    <section className='LeftSidePaneContainer'>
        <div className='SearchArea'>
            <img src='/logo.svg' alt="" height="87"width="50"></img>
            <TextInput icon={<FaSearch size={25} color={'#CCCCCC'}/>} width='218px' label='' placeHolder='Search Chymera' specialFtc={getUsers}/>
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
                         
                         <div key={index} className='MatchingUsersContainer' onClick={() => {navigate(`/User/Profile/${match.handle}`, { replace: true });}}>
                            <UserSearchPreview  profile_pic={match.profile_pic} account_name={match.account_name} handle={match.handle} />
                        </div> 
                    );  
                    else return '';         
                })

                : 

                conversations.map((conversation, index: any)=>{

                    let current = false;
                    if(id === conversation.id) current = true;

                    // console.log(current, conversation, id)
                    return(
                         
                         <div key={index} className='ConversationContainer' style={{backgroundColor: `${current ? 'darkgray' : ''}`}} onClick={()=> {navigate(`/User/Chat/${conversation.id}`, {replace: true}); window.location.reload()}}>
                            <ChatPreview chatId={conversation.id} photos={conversation.photos} names={conversation.names} latest={conversation.latest} read={conversation.read} online={conversation.online}/>
                        </div> 
                    )           
                })
            }
        </div>
    </section>
  )
}

export default LeftSidePane