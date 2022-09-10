import React from 'react'
import '../styles/Text.scss'

interface TextProps {
  type:string,
  color?:string,
  content?:string,
  bold?: boolean
}

const Text = ({type, color, content, bold}:TextProps) => {
  return (
    <p className={type + `${bold ? ' bold' : ''}`} style={{color:color}}>{content ? content : type}</p>
  )
}

Text.defaultProps = {
  type: 'body',
  color: undefined,
  content : undefined
}

export default Text