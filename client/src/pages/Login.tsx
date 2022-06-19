import React from 'react'
import Button from '../components/Button';
import Link from '../components/Link';
import Text from '../components/Text';
import TextInput from '../components/TextInput';
import { FcGoogle} from "react-icons/fc";
import {IoArrowBack} from "react-icons/io5"
import {BsArrowLeft} from "react-icons/bs"
import '../styles/Login.css'

const Login = () => {
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
            <Button text='Sign in with Google' icon={<FcGoogle />} url='https://www.google.com/?gws_rd=ssl'/>
            <section className='SignUpSection'>
                <Text type='H3' content="Don't have an account?"/>
                <Link underlined={true} content='Sign-up'/>
            </section>
        </div>
    </div>
  )
}

export default Login