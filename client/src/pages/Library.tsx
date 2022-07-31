import React, { useEffect, useState } from 'react'
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
  const [openEmptyModal, openEmptyModalNow] = useState(false);

 
  return (
    <section className='LibraryContainer' >
      <LeftSidePane />
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
      </section>
      <RightSidePane />
      <footer> <Text content='This is the footer'></Text></footer>
    </section>
  )
}

export default Library