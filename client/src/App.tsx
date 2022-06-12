import React from 'react';
import './App.css';
import Button from './components/Button';


function App() {
  return (
    <div className="App">
      
     <body >
       <div style={{height: '100%', width: '100%', display: 'flex', justifyContent: 'space-between'}}>
      <Button></Button>
      <Button color='#FF5555' text= 'ee'></Button>
      <Button state='disabled' text= 'disabled'></Button></div>

      <img src='logo.svg' alt = ' test' height="87"
    width="50"></img>
      
     </body>
    </div>
  );
}

export default App;
