import React, { useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import '../styles/LeftSidePane.scss'
import TextInput from './TextInput'
import Text from './Text'
import ChatPreview from './ChatPreview'

function LeftSidePane() {
    //TOTO: Faire une table conversations dans la DB

    const [conversations, setConversations] = useState([{
        id: '1',
        photos: ['logo.svg'],
        names: ['Oveezion Team'],
        latest: 'Welcome to ovvezion !',
        read: false,
        online: true,
    }])

  return (
    <section className='LeftSidePaneContainer'>
        <div className='SearchArea'>
            <img src='logo.svg' alt="" height="87"width="50"></img>
            <TextInput icon={<FaSearch size={25} color={'#767676'}/>} width='218px' label='' placeHolder='Search Chymera'/>
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