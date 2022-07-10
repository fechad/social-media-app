import React, { ReactElement } from 'react'
import PropTypes from 'prop-types'
import '../styles/Button.css'
import { IconBaseProps } from 'react-icons'
import Text from '../components/Text';

interface buttonProps { 
    color?: string,
    text: string,
    textType?: string,
    icon?:  ReactElement<IconBaseProps>,
    state?: string,
    url?: string
    fct: Function,
}

const Button = ({color, icon, text, textType, state, url, fct} : buttonProps) => {
  return (
    <a style={{textDecoration: "none"}} href={url}>
      <div style={ state === 'disabled' ? {backgroundColor: '#D9D9D9'} : {backgroundColor: 
        color}} className='ButtonComponent' onClick = {()=>{fct()}}>
        {text ? <Text color={state === 'disabled' ? 'darkgrey' : 'white'} type={textType} content={text}/> : ''}
        {icon ? icon : ''}
      </div>
    </a>
  )
}

Button.defaultProps = {
    color: '#8773F0',
    text: 'Test',
    textType: 'body',
    icon: undefined,
    state: 'enabled',
    fct: ()=>{console.log('future fct')}
}

Button.propTypes = {
    text: PropTypes.string.isRequired,
}
export default Button