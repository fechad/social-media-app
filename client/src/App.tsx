import React from 'react';
import './App.css';
import Text from '../src/components/Text';
import Link from './components/Link';



function App() {
  return (
    <div className='App'>
      <section>
        <Link content='Login/Sign-up' underlined={true} url='/login'/>
      </section>
      <section>
        <Text type='H1' content='Welcome to our website !' />
      </section>
    </div>
  );
}

export default App;
