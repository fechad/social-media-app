import React, { ReactElement, useState } from 'react'
import '../styles/Switch.css'
import { IconBaseProps } from 'react-icons'
import { useEffect } from 'react'

interface buttonProps { 
    lightmode?: boolean,
    icon?:  ReactElement<IconBaseProps>,
    isActive: boolean
}

const Switch = ({icon, lightmode, isActive} : buttonProps) => {
  const [state, activate] = useState([
    {
      lightmode: true,
      icon: undefined,
      isActive: false
    }]
  )
  const trigger = () => {
    activate([
      {
        lightmode: true,
        icon: undefined,
        isActive: true
      }]);
  }
  useEffect(() => {}, [{
    lightmode: true,
    icon: undefined,
    isActive: false
  }]);
  return (
    <div style={ lightmode ? {backgroundColor: '#ffffff', border: '1px solid #A1A1A1'} : {backgroundColor: 
        '#000000', border: '1px solid #000000'}} className='switch'>
        <div style={ lightmode ? {backgroundColor: '#8773F0'} : {backgroundColor: 
        '#5CE1E6'}} className = {isActive ? "open-thumb" : "close-thumb"} onClick = {trigger}> </div>
        {icon ? icon : ''}
    </div>
  )
}

Switch.defaultProps = {
    lightmode: true,
    icon: undefined,
    isActive: false
}

export default Switch