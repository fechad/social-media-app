import React, { useState } from 'react'
import '../styles/Switch.css'
import {RiNotificationFill, RiNotificationOffFill} from 'react-icons/ri'
import { BsMoonFill, BsSun } from "react-icons/bs"
import { FaGlobe} from 'react-icons/fa'
import {MdLocationPin} from 'react-icons/md'
import PropTypes from 'prop-types'
import Text from '../components/Text' 

interface SwitchProps{
  resp: string,
  role: Function,
  text?: string
}


const Switch = ({resp, role, text}: SwitchProps) => {
  const [switched, setSwitch] = useState(false);


  function doYourRole(){
    role()
    setSwitch(!switched);
  }
    
  return (
     <div className='SwitchContainer'>
       <div className={`Switch ${switched && resp === 'theme' ? 'Switched DarkMode': switched && resp !== 'theme' ? 'Switched' : 'UnSwitched'} `} onClick={() => doYourRole()}>
        {switched ? <> {(resp === 'theme') ? <BsMoonFill  className='Moon' color='white'/>  : (resp === 'notifications') ? <RiNotificationFill className='Icon-left' color='white'/> : <MdLocationPin className='Icon-left' color='white'/> }</>: ''}
        <div id='thumb' className={`${switched && resp === 'theme' ? 'opened-thumb opened-thumb-dark-mode' : switched && resp !== 'theme' ? 'opened-thumb ': 'closed-thumb'}`} />
        {switched ? '' : <> {(resp === 'theme') ? <BsSun className= 'Icon-right' />  : (resp === 'notifications') ? <RiNotificationOffFill className='Icon-right' color='#8773F0'/> : <FaGlobe className='Icon-right' color='#8773F0'/>}</>}
      </div>
      {resp === 'custom' ? <Text content={`${text} ${switched ? 'on' : 'off'}`} /> : ''}
     </div>
  )
}

Switch.defaultProps = {
  resp: ''
}

Switch.propresps ={
  resp:  PropTypes.string.isRequired,
  role:  PropTypes.string.isRequired,
}


export default Switch