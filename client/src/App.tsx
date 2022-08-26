import React from 'react';
import './App.scss';
import Text from '../src/components/Text';
import Link from './components/Link';
import { BiCopyright } from 'react-icons/bi';



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
        <Text type='H1' content='Welcome to our website !' />
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
