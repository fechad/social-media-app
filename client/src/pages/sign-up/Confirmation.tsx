import React from 'react'
import { BsArrowLeft } from 'react-icons/bs'
import Button from '../../components/Button'
import CodeInput from '../../components/CodeInput'
import Text from '../../components/Text'
import '../../styles/Confirmation.css'
import {app} from '../../firebaseConfig'
import {getAuth, applyActionCode} from "firebase/auth"

function print(){
  console.log('Sent the code')
}

const resendCode = () => {
  const auth = getAuth(app);
  const actionCode = '123456'
  applyActionCode(auth, actionCode).then((resp) => {
    // Email address has been verified.

    // TODO: Display a confirmation message to the user.
    // You could also provide the user with a link back to the app.

    // TODO: If a continue URL is available, display a button which on
    // click redirects the user back to the app via continueUrl with
    // additional state determined from that URL's parameters.
  }).catch((error) => {
    // Code is invalid or expired. Ask the user to verify their email address
    // again.
  });

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
        <section className='ResendCodeSection'>
          <Button textType='H3' text='Resend code' fct={resendCode}/>
        </section>
        <section className='ContinueSection'>
          <Button textType='H2' text='Continue' url='/User/ProfileSetup' />
        </section>
      </div>
    </div>
  )
}

export default Confirmation