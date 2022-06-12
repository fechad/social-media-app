import React from 'react'
import Button from '../components/Button';
import { FaEdit, FaUserPlus } from "react-icons/fa";
import '../styles/Library.css'

const Library = () => {
  return (
    <section className='Library'>
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
        <h1>Logo ideas :</h1>
        <section>
        <img src='logo.svg' alt = ' test' height="87"width="50"></img>
        
        </section>
      </div>
    </section>
  )
}

export default Library