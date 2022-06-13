import React from 'react'
import '../styles/TextInput.css'
import Text from '../components/Text';

interface TextInputProps {
    type: string,
    label?: string,
    placeHolder?: string,
    width?:string,
    height?: string
}

const TextInput = ({type, label, placeHolder, width, height} : TextInputProps) => {
  return (
    <div>
        <Text content={label} />
        <div style={{width: width, height: height}}>
            <input type={type} placeholder={placeHolder} maxLength={type === 'password' ? 15 : 512}></input>
        </div>
    </div>
  )
}

TextInput.defaultProps = {
    type: 'text',
    label: 'Label',
    placeHolder: 'Place holder',
    width: '400px',
    height: '48px'
}


export default TextInput