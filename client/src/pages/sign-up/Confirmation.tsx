import React from 'react'
import { BsArrowLeft } from 'react-icons/bs'
import Button from '../../components/Button'
import CodeInput from '../../components/CodeInput'
import Text from '../../components/Text'
import '../../styles/Confirmation.css'

function print(){
  console.log('Sent the code')
}

const Confirmation = () => {
  return (
    <div className='ConfirmationPage'>
      <a className='ArrowBack' href='/'><BsArrowLeft size={40}/></a>
      <div className='ConfirmationContainer'>
        <section className='ConfirmationContainerTitle'>
          <Text type='H1' content="Email validation" />
        </section>
        <Text type='H3' content='Your account creation request has been received, a validation code has been sent to {new email address}.' />
        <section className='ConfirmationCodeSection'>
          <Text content='Please enter the code to create account:' />
          <CodeInput role={print}/>
        </section>
        <Button textType='H2' text='Continue' url='/User/ProfileSetup' />
      </div>
    </div>
  )
}

export default Confirmation