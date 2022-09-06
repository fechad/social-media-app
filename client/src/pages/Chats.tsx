import React from 'react'
import LeftSidePane from '../components/LeftSidePane'
import NavBar from '../components/NavBar'
import RightSidePane from '../components/RightSidePane'
import { io } from 'socket.io-client'
import { environment } from '../environments/environment'
import { useParams } from 'react-router-dom'

const Chats = () => {

  const { id } = useParams();

  const socket = io(`${environment}`);

  socket.id = id ? id : '0';

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