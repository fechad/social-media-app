import React from 'react'
import '../styles/Button.css'

const Button = ({color, icon, text, state} : {color: string, icon: string, text: string, state: string}) => {
  return (
    <div style={ state === 'disabled' ? {backgroundColor: '#D9D9D9'} : {backgroundColor: 
        color}} className='ButtonComponent'>
        <p style={state === 'disabled' ?{color: 'darkgrey'} : {color: 'white'}}>{text}</p>
    </div>
  )
}

Button.defaultProps = {
    color: '#8773F0',
    icon: 'null',
    text: 'test',
    state: 'enabled'
}

export default Button