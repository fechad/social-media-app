import React from 'react'
import Button from '../components/Button';
import { FaEdit, FaUserPlus, FaSun } from "react-icons/fa";
import { BsSun } from "react-icons/bs"
import '../styles/Library.css'
import Text from '../components/Text';
import Switch from '../components/Switch';

const Library = () => {
  return (
    <section className='Library'>
      <div>
        <h1>Logo ideas :</h1>
        <section>
        <img src='logo.svg' alt = ' test' height="87"width="50"></img>
        </section>
      </div>

      <div>
        <h1>Buttons examples :</h1>
        <section>
            <Button></Button>
            <Button color='#FF5555' text= 'Auto layout test'/>
            <Button state='disabled' text= 'disabled'/>
            <Button text='Edit' icon = {<FaEdit color='white'/>} />
            <Button text='Add' icon={<FaUserPlus color='white'/>}/>
        </section>
      </div>
      
      <div>
        <h1>Text types :</h1>
        <section>
          <Text type='H1'/>
          <Text type='H2'/>
          <Text type='H3'/>
          <Text type='body'/>
          <Text type='PH' content='Place holder'/>
        </section>
      </div>
      <div>
        <h1> Switches :</h1>
        <section>
          <Switch lightmode = {true}></Switch>
          <Switch lightmode = {false}></Switch>
        </section>
      </div>
    </section>
  )
}

export default Library