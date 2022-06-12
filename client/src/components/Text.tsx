import React from 'react'
import '../styles/Text.css'

interface TextProps {
  type:string,
  color?:string,
  content?:string
}

const Text = ({type, color, content}:TextProps) => {
  return (
    <p className={type} style={{color:color}}>{content ? content : type}</p>
  )
}

Text.defaultProps = {
  type: 'body',
  color: undefined,
  content : undefined
}

export default Text