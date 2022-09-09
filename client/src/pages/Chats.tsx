import React from 'react'
import LeftSidePane from '../components/LeftSidePane'
import NavBar from '../components/NavBar'
import RightSidePane from '../components/RightSidePane'
import { screenRatio } from '../ScreenRatio'

const Chats = () => {

  screenRatio.calculate()

  return (
    <div>
      <div className='LeftSideContainer'><LeftSidePane /></div>
      <div>
        <NavBar selection='chats' />
        Chats
      </div>
      <div className ='RightSideContainer'><RightSidePane /></div>
    </div>
  )
}

export default Chats