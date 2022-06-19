import React from 'react'
import { BsArrowLeft } from 'react-icons/bs'
import '../../styles/Credentials.css'
import Text from '../../components/Text'
import TextInput from '../../components/TextInput'
import Button from '../../components/Button'
import { FcGoogle } from 'react-icons/fc'

const Credentials = () => {
  return (
    <div className='CredentialsPage'>
      <a className='ArrowBack' href='/'><BsArrowLeft size={40}/></a>
      <div className='CredentialsContainer'>
        <section className='CredentialsContainerTitle'>
          <Text type='H1' content="Welcome to 'Name of app'" />
        </section>
        <TextInput label='Please enter your email address:' placeHolder='ex: JohnDoe@domainName.com'/>
        <TextInput label='Please choose a password:' type='password' placeHolder=' '/>
        <div className='ProgressBarSection'> Insert progress bar here</div>
        <section className='Separator'>
                <hr />
                <Text type='H2' content='OR'/>
                <hr />
        </section>
        <Button textType='H2' text='Sign in with Google' icon={<FcGoogle size={40} />} url='https://www.google.com/?gws_rd=ssl'/>
        <section className='ContinueSection'>
          <Button textType='H2' text='Continue'/>
        </section>
      </div>
    </div>
  )
}

export default Credentials