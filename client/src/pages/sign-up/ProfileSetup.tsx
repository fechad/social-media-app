import React from 'react'
import { BsArrowLeft } from 'react-icons/bs'
import '../../styles/ProfileSetup.css'
import Text from '../../components/Text'
import Button from '../../components/Button'
import TextInput from '../../components/TextInput'
import {VscInfo } from 'react-icons/vsc'
import {FiUpload} from 'react-icons/fi'
import { environment } from '../../environments/environment';
import { json } from 'stream/consumers'

const ProfileSetup = () => {
    const sendInfo = async () => {
        await fetch(`${environment.serverUrl}/user`, {
          method: 'POST',
          headers: {'Content-type': 'application/json'},
          body: JSON.stringify({ "user": {
            "email" : 'bang',
            "password" : 'mdp'
          }}),
        })
    }
  return (
    <div className='ProfileSetupPage'>
      <a className='ArrowBack' href='/Login'><BsArrowLeft size={40}/></a>
      <div className='ProfileSetupContainer'>
        <section className='ProfileSetupContainerTitle'>
          <Text type='H1' content="Let's start by setting up your profile !" />
        </section>
        <div className='Content'>
          <section className='PhotoInputSection'>
            <div className='PhotoPreview'> Insert photo component here </div>
            <Button text='Upload a photo' icon={<FiUpload color='white' size={24}/>}/>
          </section>
          <section className='ProfileDetailsSection'>
            <section className='HandleSection'>
              <Text color='red' content='*' />
              <TextInput width='392px' label='Choose your account handle:'  placeHolder='ex: @handle'/>
              <VscInfo className='InfoIcon' size={30}/>
            </section>
            <section className='BirthDaySection'>
              <Text color='red' content='*' />
              <Text type='H3' content='Enter your birthday:' />
              <input type={'date'} className='DateInput body'/>
              <VscInfo className='InfoIcon' size={30}/>
            </section>
            <TextInput label='Choose your account name:' placeHolder='ex: accountName2022' />
            <section className='BioSection'>
              <Text content='Bio:' />
              <textarea placeholder='Write a short bio !' maxLength={512} />
            </section>
            <Button textType='H3' text='Create profile' url = '/User/newsOptions' fct = {sendInfo}/>
          </section>
        </div>
      </div>
    </div>
  )
}

export default ProfileSetup