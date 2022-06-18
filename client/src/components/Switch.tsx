import React, {  ReactElement, useState } from 'react'
import '../styles/Switch.css'
import { BsSun } from "react-icons/bs"
import { FaBell, FaBellSlash, FaGlobe, FaMapPin, FaRegMoon } from 'react-icons/fa'
import { IconBaseProps } from 'react-icons'
import PropTypes from 'prop-types'

interface SwitchProps{
  resp: string,
  role: Function
}


const Switch = ({resp, role}: SwitchProps) => {
  const [switched, setSwitch] = useState(false);


  function doYourRole(){
    role()
    setSwitch(!switched);
  }
    
  return (
      <div className={`Switch ${switched && resp === 'theme' ? 'Switched DarkMode': switched && resp !== 'theme' ? 'Switched' : 'UnSwitched'} `} onClick={() => doYourRole()}>
        {switched ? <> {(resp === 'theme') ? <FaRegMoon  className='Moon'/>  : (resp === 'notifications') ? <FaBell className='Icon-left'/> : <FaGlobe className='Icon-left'/>}</>: ''}
        <div id='thumb' className={`${switched && resp === 'theme' ? 'opened-thumb opened-thumb-dark-mode' : switched && resp !== 'theme' ? 'opened-thumb ': 'closed-thumb'}`} />
        {switched ? '' : <> {(resp === 'theme') ? <BsSun className= 'Icon-right' />  : (resp === 'notifications') ? <FaBellSlash className='Icon-right'/> : <FaMapPin className='Icon-right' />}</>}
      </div>
  )
}

Switch.propresps ={
  resp:  PropTypes.string.isRequired,
  role:  PropTypes.string.isRequired,
}


export default Switch