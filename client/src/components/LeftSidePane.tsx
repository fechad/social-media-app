import React, { useEffect, useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import '../styles/LeftSidePane.scss'
import TextInput from './TextInput'
import Text from './Text'
import ChatPreview from './ChatPreview'
import { environment } from '../environments/environment'

function LeftSidePane() {
    //TOTO: Faire une table conversations dans la DB
    // const [users, setUsers] = useState([{
    //     handle: '',
    //     photo: '',
    //     name: '',
    // }])
    
    const getUsers = async () => {
        //const users = []
        console.log('1st')
        const inputText = (document.getElementsByClassName('inputContainer')[0].firstChild as HTMLInputElement).value;
        console.log(inputText);
        await fetch(`${environment.serverUrl}/database/users/Search/${inputText}`, {
            method: 'GET',
          }).then(async (result) => {
            await result.json()
            .then((data) =>{
                console.log(data[0]?.handle);

            })
        });
        
        
    };
    
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [conversations, setConversations] = useState([{
        id: '10',
        photos: ['/logo.svg'],
        names: ['Oveezion Team'],
        latest: 'Welcome to ovvezion !',
        read: false,
        online: true,
    }])

    // useEffect(() =>{
    //     console.log('onload');
    //     (document.getElementsByClassName('inputContainer')[0].firstChild as HTMLInputElement).addEventListener('keydown', (event) =>{
    //         //if(event.target)
    //         getUsers();
    //     })
    //   },
    //   []
    // );

  return (
    <section className='LeftSidePaneContainer' >
        <div className='SearchArea'>
            <img src='/logo.svg' alt="" height="87"width="50"></img>
            <TextInput icon={<FaSearch size={25} color={'#767676'}/>} width='218px' label='' placeHolder='Search Chymera' specialFtc={getUsers}/>
        </div>
        <div className='LeftSidePaneTittle'>
            <Text type='H2' content='Conversations'/>
        </div>
        <div className='ConversationsArea'>
            {conversations.map((conversation)=>{
                return(
                     
                     <div className='ConversationContainer'>
                        <ChatPreview  chatId={conversation.id} photos={conversation.photos} names={conversation.names} latest={conversation.latest} read={conversation.read} online={conversation.online}/>
                    </div> 
                )           
            })}
        </div>
    </section>
  )
}

export default LeftSidePane