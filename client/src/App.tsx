import React from 'react';
import './App.scss';
import Text from '../src/components/Text';
import Link from './components/Link';
import { BiCopyright } from 'react-icons/bi';
import Button from './components/Button';



function App() {
  return (
    <div className='App'>
      <section className='page-header'>
        <section className='nav-bar'>
          <img src='/logo.svg' alt="" height="80px"width="80px"></img>
          <div className='nav-bar-sections'>
            <p>About the app</p>
            <p>About the team</p>
            <p>Help</p>
          </div>
          <Link content='Login' underlined={true} url='/login'/>
        </section>
      </section>
      <section className='app-summary'>
        <div className='app-modal'>
          <div className='app-modal-header'>
            <p style={{fontSize: '60px', fontWeight: 'Bold'}}>Welcome to Chymera</p>
          </div>
          <div className='app-modal-content'>
            <p style={{fontSize: '35px'}}>This is a social media website project designed to allow users to share their opinions and moments, interact with others through chats and get informed on the latest news updates.</p>
          </div>
          <div className='app-modal-footer'>
            <Button color='#5CE1E6' text='Login' textType='H2'/>
            <Button text='Sign up' textType='H2'/>
          </div>
        </div>
        <img className='summary-logo' src='/logo.svg' alt="" height="288px"width="288px"></img>
      </section>
      <section className='app-sample'>
        <Text type='H1' content='Welcome to our website !' />
      </section>
      <section className='app-sample'>
        <Text type='H1' content='Welcome to our website !' />
      </section>
      <section className='app-sample'>
        <Text type='H1' content='Welcome to our website !' />
      </section>
      <section className='team-bios'>
        <Text type='H1' content='Welcome to our website !' />
      </section>
      <footer className='page-footer'>
        <p>Email: oveezion@gmail.com</p>
        <p>Chymera App  {<BiCopyright/>} 2022</p>
      </footer>
    </div>
  );
}

export default App;
