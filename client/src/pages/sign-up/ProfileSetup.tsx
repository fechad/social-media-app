import React from 'react'
import { BsArrowLeft } from 'react-icons/bs'
import '../../styles/ProfileSetup.css'
import Text from '../../components/Text'
import Button from '../../components/Button'

const ProfileSetup = () => {
  return (
    <div className='ProfileSetupPage'>
      <a className='ArrowBack' href='/Login'><BsArrowLeft size={40}/></a>
      <div className='ProfileSetupContainer'>
        <section className='ConfirmationContainerTitle'>
          <Text type='H1' content="Let's start by setting up your profile !" />
        </section>
        <div className='Content'>
          <section className='PhotoInputSection'>
            <div className='PhotoPreview'> Insert photo component here </div>
            <Button />
          </section>

          <section className='ProfileDetailsSection'></section>
        </div>
      </div>
    </div>
  )
}

export default ProfileSetup