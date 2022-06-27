import React from 'react'
import { BsArrowLeft } from 'react-icons/bs'
import Button from '../../components/Button'
import Text from '../../components/Text'
import '../../styles/Confirmation.css'
import {app} from '../../firebaseConfig'
import {getAuth, sendEmailVerification} from "firebase/auth"
import { useNavigate } from 'react-router-dom'

/*
function print(){
  console.log('Sent the code')
}
*/


const Confirmation = () => {
  
  function  getUserEmail() {
    const auth = getAuth(app);
    const user = auth.currentUser;
    return user!.email

  }

  let navigate = useNavigate();
  const checkEmailVerification = () => {
    const auth = getAuth(app);
    console.log(auth.currentUser?.emailVerified)
    if(auth.currentUser?.emailVerified){
      navigate("/User/ProfileSetup", { replace: true });

    } else{
      alert('Email not verified');
    }
    
  }

  const resendEmail = () => {
    const auth = getAuth(app);
    const user = auth.currentUser!;
    if(user.emailVerified){
      alert('User verified')
    } else {
      sendEmailVerification(user)
      .then(() => {
        alert('Email sent')
      });
    }
    
  }

  return (
    <div className='ConfirmationPage'>
      <a className='ArrowBack' href='/'><BsArrowLeft size={40}/></a>
      <div className='ConfirmationContainer'>
        <section className='ConfirmationContainerTitle'>
          <Text type='H1' content="Email validation" />
        </section>
        <Text type='H3' content={`Your account creation request has been received, a validation code has been sent to ${getUserEmail()}. Please verify your email to continue`} />
        
        <section className='ResendEmailSection'>
          <Button textType='H3' text='Resend email' fct={resendEmail}/>
        </section>
        <section className='ContinueSection'>
          <Button textType='H2' text='Continue' fct={checkEmailVerification} />
        </section>
      </div>
    </div>
  )
}

export default Confirmation