import React, { useState } from 'react'
import { BsArrowLeft } from 'react-icons/bs'
import '../../styles/Credentials.css'
import Text from '../../components/Text'
import TextInput from '../../components/TextInput'
import Button from '../../components/Button'
import { FcGoogle } from 'react-icons/fc'
import {app} from '../../firebaseConfig'
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup} from "firebase/auth";


const Credentials = () => {

  const [validCredentials, setCredentialsStatus] = useState(false);

  const auth = getAuth(app);

  const collectInfos = async () => {
    const signUpInfos = {
        "email" : (document.getElementsByClassName('inputContainer')[0].firstChild as HTMLInputElement).value,
        "password" : (document.getElementsByClassName('inputContainer')[1].firstChild as HTMLInputElement).value,
    }
    createUserWithEmailAndPassword(auth, signUpInfos.email, signUpInfos.password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      console.log(user)
      // ...
    })
    .catch((error) => {
      //const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage)
    });
  }

  const signUpWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
        .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        // The signed-in user info.
        const user = result.user;
        console.log(user, token, credential);
        // ...
        }).catch((error) => {
            // Handle Errors here.
            //const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            //const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            alert({errorMessage, credential});

            // ...
        });
}


  return (
    <div className='CredentialsPage'>
      <a className='ArrowBack' href='/'><BsArrowLeft size={40}/></a>
      <div className='CredentialsContainer'>
        <section className='CredentialsContainerTitle'>
          <Text type='H1' content="Welcome to 'Name of app'" />
        </section>
        <TextInput label='Please enter your email address:' placeHolder='ex: JohnDoe@domainName.com'/>
        <TextInput label='Please choose a password:' type='password' placeHolder=' '/>
        <div className='ProgressBarSection'> Insert progress bar component here</div>
        <section className='Separator'>
                <hr />
                <Text type='H2' content='OR'/>
                <hr />
        </section>
        <Button textType='H2' text='Sign up with Google' icon={<FcGoogle size={40} />} fct={signUpWithGoogle}/>
        <section className='ContinueSection'>
          <Button textType='H2' text='Continue'  url={validCredentials ? '/Sign-up/confirmation' : undefined } fct={collectInfos}/>
        </section>
      </div>
    </div>
  )
}

export default Credentials