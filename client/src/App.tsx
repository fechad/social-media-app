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
        <div className='sample-image'>
          <img src='/create_and_share.jpg' alt="" height="400"width="528px"></img>
        </div>
        <div className='sample-description'>
          <div className='sample-description-header'>
            <p style={{fontSize: '50px', fontWeight: 'Bold'}}>Create and Share</p>
          </div>
          <div className='sample-description-content'>
            <p style={{fontSize: '35px'}}>Share your moments and opinions with other users of the website. Like, comment and bookmark posts shared on our discover page.</p>
          </div>
        </div>
      </section>
      <section className='app-sample'>
        <div className='sample-description-reverse'>
          <div className='sample-description-header'>
            <p style={{fontSize: '50px', fontWeight: 'Bold'}}>Connect and Discuss</p>
          </div>
          <div className='sample-description-content'>
            <p style={{fontSize: '35px'}}>Chat with friends and loved ones thanks to our chat feature. Weather it’s in single conversations or chat groups, Chymera makes it easy to communicate.</p>
          </div>
        </div>
        <div className='sample-image'>
          <img src='/connect_and_discuss.jpg' alt="" height="400"width="528px"></img>
        </div>
      </section>
      <section className='app-sample'>
        <div className='sample-image'>
          <img src='/stay_informed.jpg' alt="" height="400"width="528px"></img>
        </div>
        <div className='sample-description'>
          <div className='sample-description-header'>
            <p style={{fontSize: '60px', fontWeight: 'Bold'}}>Stay Informed</p>
          </div>
          <div className='sample-description-content'>
            <p style={{fontSize: '35px'}}>Thanks to News API integration, you can acces news accross the world for free. Based on your profile preferences, get the scoop on the latest headlines.</p>
          </div>
        </div>
      </section>
      <section className='team-bios'>
        <div className='team-bios-title'>
          <p>About the team</p>
        </div>
        <div className='team-bios-content'>
          <div className='team-member'>
            <div className='team-member-photo-container'>
              <img className='team-member-photo' src='/fedwin.jpg' alt="" height="288px"width="288px"></img>
            </div>
            <div className='team-member-name'>
              <p>Fedwin Chatelier</p>
            </div>
            <div className='team-member-description'>
              <p>
                Hi my name is Fedwin, I’m currently a software engenieering student at Polytechnique of Montreal. In this project I played the roles of Web Architech and FullStack software developper. 
              </p>
            </div>
            <div className='team-member-contact-info'>
              <p>
                LinkedIn: {<a href='https://www.linkedin.com/in/fedwin-chatelier-52282a230/'>Fedwin Chatelier</a>}
                <br/>GitHub:{<a href='https://github.com/fechad'>fechad</a>}
                <br/>Buisiness email: oveezion@gmail.com
              </p>
            </div>
          </div>
          <div className='team-member-2'>
            <div className='team-member-photo-container'>
              <img className='team-member-photo' src='/fedwin.jpg' alt="" height="288px"width="288px"></img>
            </div>
            <div className='team-member-name'>
              <p>Étienne Aumais Boucher</p>
            </div>
            <div className='team-member-description'>

            </div>
            <div className='team-member-contact-info'>

            </div>
          </div>
        </div>
      </section>
      <footer className='page-footer'>
        <p>Email: oveezion@gmail.com</p>
        <p>Chymera App  {<BiCopyright/>} 2022</p>
      </footer>
    </div>
  );
}

export default App;
