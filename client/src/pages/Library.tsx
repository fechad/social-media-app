import React from 'react'
import Button from '../components/Button';
import { FaEdit } from "react-icons/fa";

const Library = () => {
  return (
    <section>
      <div style={{height: '100%', width: '100%', display: 'flex', justifyContent: 'space-between'}}>
      <Button></Button>
      <Button color='#FF5555' text= 'ee'></Button>
      <Button state='disabled' text= 'disabled'></Button></div>
      <Button icon = {<FaEdit/>} ></Button>

      <img src='logo.svg' alt = ' test' height="87"
    width="50"></img>
    </section>
  )
}

export default Library