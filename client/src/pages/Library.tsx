import React, { useEffect } from 'react'
import Button from '../components/Button';
import { FaEdit, FaSearch, FaUserPlus } from "react-icons/fa";
import '../styles/Library.css'
import Text from '../components/Text';
import Switch from '../components/Switch';
import Link from '../components/Link';
import TextInput from '../components/TextInput';
import Checkbox from '../components/Checkbox';
import CodeInput from '../components/CodeInput';
import Avatar from '../components/Avatar';
import ChatPreview from '../components/ChatPreview';
import LeftSidePane from '../components/LeftSidePane';
import RightSidePane from '../components/RightSidePane';
import NavBar from '../components/NavBar';
import RadioButton from '../components/RadioButton';
import Modal from '../components/Modal';
import Tabs from '../components/Tabs';
import NewsArticle from '../components/NewsArticle';
import Message from '../components/Message';
import MessageBar from '../components/MessageBar';
import eventBus from '../components/eventBus';


function print(){
  console.log('I did my job !');
}

function modalContent(){

  return(
    <div>
      <h1> This is an empty modal</h1>
      <p> Add more to it</p>
    </div>
  )
}

const Library = () => {

  useEffect(()=>{
    
    eventBus.on('sendMessage', (e: any) => {
      console.log(e.detail)
    });

    eventBus.on('messageAction', (e: any) => {
       console.log(e.detail, 'Library')
    });
  }, [])
  

  return (
    <section className='LibraryContainer'>
      {/* <LeftSidePane /> */}
      <NavBar selection='discover'/>
      <section className='Library'>
        <div>
          <Text type='H1' content='Logo ideas:' />
          <section>
          <img src='logo.svg' alt="" height="87"width="50"></img>
          </section>
        </div>

        <div>
          <Text type='H1' content='Button examples:' />
          <section>
              <Button textType='H1' text='Button plus large'></Button>
              <Button color='#FF5555' text= 'Auto layout test'/>
              <Button state='disabled' text= 'Disabled'/>
              <Button text='Edit' icon = {<FaEdit color='white'/>} />
              <Button text='Add' icon={<FaUserPlus color='white'/>}/>
          </section>
        </div>
        
        <div>
        <Text type='H1' content='Text examples :' />
          <section>
            <Text type='H1'/>
            <Text type='H2'/>
            <Text type='H3'/>
            <Text type='body'/>
            <Text type='PH' content='Place holder'/>
          </section>
        </div>
        <div>
          <Text type='H1' content='Link examples:' />
          <section>
            <Link />
            <Link underlined={true}/>
          </section>
        </div>

        <div>
        <Text type='H1' content='TextInput examples:' />
          <section>
            <TextInput label='This is a text input' />
            <TextInput type='password' label='This is a password input' placeHolder='Enter password' />
            <TextInput icon={<FaSearch size={25} color={'#767676'}/>} />
            <TextInput icon={<FaSearch size={25} color={'#767676'}/>} width='200px'/>
          </section>
        </div>

        <div>
        <Text type='H1' content='Checkbox examples:' />
          <section>
            <Checkbox text='Is this a checkbox ? Check if yes !' />
            <Checkbox text='Is this a checkbox ? Check if yes !' />
        
          </section>
        </div>

        <div>
          <Text type='H1' content='Switches' />
          <section>
            <Switch resp='theme' role={print}/>
            <Switch resp='notifications' role={print} />
            <Switch resp='' role={print} />
          </section>
        </div>

        <div>
          <Text type='H1' content='Code input:' />
          <section>
            <CodeInput role={print} />
          </section>
        </div>

        <div>
          <Text type='H1' content='Avatars:' />
          <section>
            <Avatar photo='logo.svg' online={false} />
            <Avatar photo='logo.svg' online={true} />
          </section>
        </div>

        <div>
          <Text type='H1' content='Chat Previews:' />
          <section>
            <ChatPreview photos={['logo.svg']} names={['Fedwin Chatelier']}  latest='Hey you whats up ?' read={false}/>
            <ChatPreview photos={['logo.svg']} names={['Fedwin Chatelier']}  latest='Hey you whats up ?' read={true}/>
            <ChatPreview photos={['logo.svg']} names={['Fedwin Chatelier']}  latest='Hey you whats up ?' read={true} online={true}/>
          </section>
        </div>

        <div>
          <Text type='H1' content='Group-chat Previews:' />
          <section>
            <ChatPreview photos={['logo.svg', 'logo.svg']} names={['Fedwin Chatelier', 'Étienne Aumais-Boucher']}  latest='So what are we doing on sunday ?' read={false} groupChat={true}/>
            <ChatPreview photos={['logo.svg', 'logo.svg', 'logo.svg']} names={['Fedwin Chatelier', 'Étienne Aumais-Boucher', 'user3']}  latest='So what are we doing on sunday ?' read={true} groupChat={true}/>
          </section>
        </div>

        <div>
        <Text type='H1' content='Radio buttons' />
          <section>
            <RadioButton text='option 1' alreadyChecked={true}/>
            <RadioButton text='option 1' alreadyChecked={false} />
          </section>
        </div>

        <div>
          <Text type='H1' content='Modal examples' />
          <section>
            <Modal triggerElement={<Button text='Open empty modal' />} title='This is a modal' modalWidth='200px' modalHeight='150px'>
              <div>
                <Tabs pages={[modalContent()]} tabs='' />
              </div>
            </Modal>

            <Modal triggerElement={<Button text='Open empty modal with buttons' />} title='This is a modal' modalWidth='200px' modalHeight='150px' primary='Primary' primaryFct={() => {console.log('I did my primary job')}} secondary='Secondary' secondaryFct={() => {console.log('I did my secondary job')}}>
              <div>
                <Tabs pages={[modalContent()]} tabs='' />
              </div>
            </Modal>
          </section>
        </div>

        <div>
          <Text type='H1' content='NewsArticle' />
          <section>
            <NewsArticle title='This is a news article example,  Needs ellipsis , Need ellipsis, Need ellipsis' imageURL='https://misinforeview.hks.harvard.edu/wp-content/uploads/2022/07/fake-news-g1bc0f9637_1920-1024x576.jpg' articleUrl='https://devbeep.com/html-404-page-templates/' description='Fake news is in today !'/>
          </section>
          <div style={{marginBottom:'40px'}}>

          </div>
          <section>
            <NewsArticle 
            title='This is a news article example' 
            imageURL='https://ichef.bbci.co.uk/news/976/cpsprodpb/14CCB/production/_95159158_fakenews.jpg' 
            articleUrl='https://devbeep.com/html-404-page-templates/' 
            description={`is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishin`}/>
          </section>
        </div>
        <div style={{marginBottom:'40px'}}>
        </div>
        <div>
          <Text type='H1' content='Message examples' />
          <section style={{display: 'flex', flexDirection: 'column'}}>
            <Message message='This is a message bubble This is a message bubble This is a message bubble This is a message bubble This is a message bubble This is a message bubble This is a message bubble This is a message bubble This is a message bubble' time='11:59' sender={true} handle='' profile_pic='logo.svg'/>
            <Message message='This is a message bubble This is a message bubble ' time='11:59' sender={true} handle='' profile_pic='logo.svg'/>
            <Message message='This is a message bubble ' time='11:59' sender={true} handle='' profile_pic='logo.svg'/>
            <Message message='This is a message bubble This is a message bubble This is a message bubble This is a message bubble This is a message bubble This is a message bubble This is a message bubble This is a message bubble This is a message bubble' time='11:59' sender={false} handle='' profile_pic='logo.svg'/>
            <Message message='This is a message bubble This is a message bubble ' time='11:59' sender={false} handle='' profile_pic='logo.svg'/>
            <Message message='This is a message bubble ' time='11:59' sender={false} handle='' profile_pic='logo.svg'/>
          </section>
        </div>
        <div style={{marginBottom:'40px'}}>
        </div>
        <div style={{height: 'auto'}}>
          <Text type='H1' content='Message Bar' />
          <section style={{display: 'flex', flexDirection: 'column', height: 'auto',position: 'relative'}}>
            <MessageBar />
          </section>
        </div>
      </section>
      {/* <RightSidePane /> */}
      <footer> <Text content='This is the footer'></Text></footer>
    </section>
  )
}

export default Library