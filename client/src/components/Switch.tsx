import React, { ReactElement } from 'react'
import '../styles/Switch.css'
import { IconBaseProps } from 'react-icons'

interface buttonProps { 
    lightmode?: boolean,
    icon?:  ReactElement<IconBaseProps>,
}

const Switch = ({icon, lightmode} : buttonProps) => {
  return (
    <div style={ lightmode === true ? {backgroundColor: '#ffffff'} : {backgroundColor: 
        '#000000'}} className='switch'>
        {icon ? icon : ''}
        <input type="checkbox" id = "switch" style = {lightmode === true ? {backgroundColor: '#8773F0'} : {backgroundColor: 
        '#5CE1E6'}}></input>
        <label htmlFor="switch">
            <div className = "thumb"></div>
        </label>
    </div>
  )
}

Switch.defaultProps = {
    lightmode: true,
    icon: undefined,
}

export default Switch