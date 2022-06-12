import React, { ReactElement } from 'react'
import PropTypes from 'prop-types'
import '../styles/Button.css'
import { IconBaseProps } from 'react-icons'
import Text from '../components/Text';

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
        <Text color={state === 'disabled' ? 'darkgrey' : 'white'} content={text}/>
        {icon ? icon : ''}
    </div>
  )
}

Button.defaultProps = {
    color: '#8773F0',
    text: 'Test',
    icon: undefined,
    state: 'enabled'
}

Button.propTypes = {
    text: PropTypes.string.isRequired,
}
export default Button