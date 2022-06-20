import React from 'react'
import { BsArrowLeft } from 'react-icons/bs'
import { VscInfo } from 'react-icons/vsc'
import Button from '../../components/Button'
import Checkbox from '../../components/Checkbox'
import Switch from '../../components/Switch'
import Text from '../../components/Text'
import '../../styles/NewsOptions.css'

function print(){
  console.log('Activated local news')
}


const NewOptions = () => {
  return (
    <div className='NewsOptionsPage'>
      <a className='ArrowBack' href='/Login'><BsArrowLeft size={40}/></a>
      <a className='SkipLink H2' href='https://www.w3schools.com/'> Skip</a>
      <div className='NewsOptionsContainer'>
        <section className='NewsOptionsContainerTitle'>
          <Text type='H1' content="News options !" />
        </section>
        <section className='Description'>
          <Text type='H2' content='Get informed with the latest topics by selecting your news preferences !' />
        </section>
         <Text type='H3' content='News preferences'/>
        <section className='CheckboxesSection'>
          <Checkbox text='All'/>
          <Checkbox text='Finance'/>
          <Checkbox text='Technology'/>
          <Checkbox text='Arts'/>
          <Checkbox text='Cinema'/>
          <Checkbox text='Food'/>
          <Checkbox text='Sports'/>
          <Checkbox text='Politics'/>
          <Checkbox text='Game'/>
        </section>
        <section className='LocalNewsOptionSection'>
          <Text type='H3' content='Activate local news options:'/>
          <Switch resp='custom' role={print} text={'Local news'} />
          <VscInfo className='InfoIcon' size={30}/>
        </section>
        <Button textType='H3' text='Continue to App' url='/'/>
         
      </div>
    </div>
  )
}

export default NewOptions