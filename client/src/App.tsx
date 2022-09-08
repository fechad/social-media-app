import React, { useEffect, useState } from 'react';
import './App.scss';
import Link from './components/Link';
import { BiCopyright } from 'react-icons/bi';
import Button from './components/Button';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useNavigate } from 'react-router-dom';
import { screenRatio } from './ScreenRatio'


function App() {
  let navigate = useNavigate();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [beta, setBetaVersion] = useState(true);
  AOS.init({once: false, mirror: true})

  useEffect(()=>{
    screenRatio.calculate();
  },[]);

  return (
    <div className='App'>
      <section className='page-header'>
        <section className='nav-bar'>
          <img src='/logo.svg' alt="" height="80px"width="80px" onClick={() => document.getElementsByClassName('app-summary')[0].scrollIntoView({block: 'center', inline: 'center'})}></img>
          <div className='nav-bar-sections'>
            <p onClick={() => document.getElementsByClassName('app-sample')[0].scrollIntoView({block: 'center', inline: 'center'})}>About the app</p>
            <p onClick={() => document.getElementsByClassName('team-bios')[0].scrollIntoView({block: 'nearest', inline: 'center'})}>About the team</p>
            <p></p>
          </div>
          <Link content='Login' underlined={true} url='/login'/>
        </section>
      </section>
      <section className='app-summary'>
        <div className='app-modal' 
          data-aos='slide-down'
          data-aos-duration="1500"
          data-aos-once="false"
        >
          <div className='app-modal-header'>
            <div className='app-modal-header-title'>
              <p style={{fontSize: '60px', fontWeight: 'Bold'}}>Welcome to Chymera</p>
            </div>
            {
              beta ? 
              <div className='app-modal-beta'>
                <p style={{fontSize: '30px', fontWeight: 'Bold', color:'white'}}>Beta v1.3</p>
              </div>
              : ''
            }
          </div>
          <div className='app-modal-content'>
            <p style={{fontSize: '35px'}}>This is a social media website project designed to allow users to share their opinions and moments, interact with others through chats and get informed on the latest news updates.</p>
          </div>
          <div className='app-modal-footer'>
            <Button color='#5CE1E6' text='Login' textType='H2' fct={() => {navigate('/login', {replace: true})}}/>
            <Button text='Sign up' textType='H2'fct={() => navigate('/Sign-up', {replace: true})}/>
          </div>
        </div>
        <div className='summary-logo-circle'>
          <img className='summary-logo' src='/logo.svg' alt="" height="188px"width="188px" data-aos='fade' data-aos-duration="1500" data-aos-once="false"></img>
        </div>
      </section>
      <section className='app-sample'>
        <div className='sample-image'
          data-aos='slide-right'
          data-aos-duration="1500"
          data-aos-once="false"
        >
          <img src='/create_and_share.jpg' alt="" height="400"width="528px"></img>
        </div>
        <div className='sample-description'
          data-aos='fade-right'
          data-aos-duration="1500"
          data-aos-once="false"
        >
          <div className='sample-description-header'>
            <p style={{fontSize: '50px', fontWeight: 'Bold'}}>Create and Share</p>
          </div>
          <div className='sample-description-content'>
            <p style={{fontSize: '35px'}}>Share your moments and opinions with other users of the website. Like, comment and bookmark posts shared on our discover page.</p>
          </div>
        </div>
      </section>
      <section className='app-sample'>
        <div className='sample-description-reverse'
          data-aos='fade-left'
          data-aos-duration="1500"
          data-aos-once="false"
        >
          <div className='sample-description-header'>
            <p style={{fontSize: '50px', fontWeight: 'Bold'}}>Connect and Discuss</p>
          </div>
          <div className='sample-description-content'>
            <p style={{fontSize: '35px'}}>Chat with friends and loved ones thanks to our chat feature. Weather it’s in single conversations or chat groups, Chymera makes it easy to communicate.</p>
          </div>
        </div>
        <div className='sample-image'
          data-aos='slide-left'
          data-aos-duration="1500"
          data-aos-once="false"
        >
          <img src='/connect_and_discuss.jpg' alt="" height="400"width="528px"></img>
        </div>
      </section>
      <section className='app-sample'>
        <div className='sample-image'
          data-aos='slide-right'
          data-aos-duration="1500"
          data-aos-once="false"
        >
          <img src='/stay_informed.jpg' alt="" height="400"width="528px"></img>
        </div>
        <div className='sample-description'
          data-aos='fade-right'
          data-aos-duration="1500"
          data-aos-once="false"
        >
          <div className='sample-description-header'>
            <p style={{fontSize: '60px', fontWeight: 'Bold'}}>Stay Informed</p>
          </div>
          <div className='sample-description-content'>
            <p style={{fontSize: '35px'}}>Thanks to News API integration, you can acces news accross the world for free. Based on your profile preferences, get the scoop on the latest headlines.</p>
          </div>
        </div>
      </section>
      <section className='team-bios'>
        <div data-aos='slide-up' data-aos-duration="1000" data-aos-once='false'>
          <div className='team-bios-title'>
            <p>Creators</p>
          </div>
          <div className='team-bios-content'>
            <div className='team-member'
              data-aos='fade-right'
              data-aos-duration="1500"
              data-aos-once="false"
            >
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
            <div className='team-member-2'
              data-aos='fade-left'
              data-aos-duration="1500"
              data-aos-once="false"
            >
              <div className='team-member-photo-container'>
                <img className='team-member-photo' src='/etienne.jpg' alt="" height="288px"width="288px"></img>
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
