import React, { ReactElement } from 'react'
import PropTypes from 'prop-types'
import '../styles/Button.css'
import { IconBaseProps } from 'react-icons'

interface buttonProps { 
    color?: string,
    text: string,
    icon?:  ReactElement<IconBaseProps>,
    state?: string
}

const Button = ({color, icon, text, state} : buttonProps) => {
  return (
    <div style={ state === 'disabled' ? {backgroundColor: '#D9D9D9'} : {backgroundColor: 
        color}} className='ButtonComponent'>
        <p style={state === 'disabled' ?{color: 'darkgrey'} : {color: 'white'}}>{text}</p>
        {icon ? icon : ''}
    </div>
  )
}

Button.defaultProps = {
    color: '#8773F0',
    text: 'test',
    icon: undefined,
    state: 'enabled'
}

Button.propTypes = {
    text: PropTypes.string.isRequired,
}
export default Button