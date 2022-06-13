import React from 'react'
import Button from '../components/Button';
import { FaEdit, FaUserPlus } from "react-icons/fa";
import '../styles/Library.css'
import Text from '../components/Text';
import Link from '../components/Link';

const Library = () => {
  return (
    <section className='Library'>
      <div>
        <Text type='H1' content='Logo ideas:' />
        <section>
        <img src='logo.svg' alt = ' test' height="87"width="50"></img>
        </section>
      </div>

      <div>
        <Text type='H1' content='Button examples:' />
        <section>
            <Button textType='H1' text='Button plus large'></Button>
            <Button color='#FF5555' text= 'Auto layout test'/>
            <Button state='disabled' text= 'disabled'/>
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
    </section>
  )
}

export default Library