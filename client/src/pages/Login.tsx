import React, { useState } from 'react'
import Button from '../components/Button';
import Link from '../components/Link';
import Text from '../components/Text';
import TextInput from '../components/TextInput';
import { FcGoogle} from "react-icons/fc";
import {BsArrowLeft} from "react-icons/bs"
import '../styles/Login.css'

const Login = () => {

    const [validCredentials, setCredentialsStatus] = useState(false);

    const collectInfos = async () => {

        const loginInfos = {
            "email" : (document.getElementsByClassName('inputContainer')[0].firstChild as HTMLInputElement).value,
            "password" : (document.getElementsByClassName('inputContainer')[1].firstChild as HTMLInputElement).value,
        }
        console.log(loginInfos)
      }

  return (
    <div className='LoginPage'>
        <a className='ArrowBack' href='/'><BsArrowLeft size={40}/></a>
        <div className='LoginContainer'>
            <section className='LoginHeader'>
                <img src='logo.svg' alt = ' test' height="87"width="50"></img>
                <Text type='H3' content='Name of app'/>
            </section>
            <TextInput label='Email' placeHolder='ex: jDoe@gmail.com'/>
            <section className='PasswordSection'>
                <Link underlined={false} content='Forgot password?'/>
                <TextInput type='password' placeHolder='Enter password'/>
            </section>
            <section className='Separator'>
                <hr />
                <Text type='H2' content='OR'/>
                <hr />
            </section>
            <Button textType='H2' text='Sign in with Google' icon={<FcGoogle size={40} />} url='https://www.google.com/?gws_rd=ssl'/>
            <section className='LoginSection'>
                <Button textType='H2' text='Login' url={validCredentials ? '/Discover' : undefined} fct={collectInfos}/>
            </section>
            <section className='SignUpSection'>
                <Text type='H3' content="Don't have an account?"/>
                <Link underlined={true} content='Sign-up' url='/Sign-up'/>
            </section>
        </div>
    </div>
  )
}

export default Login