import React, { ReactElement } from 'react'
import '../styles/TextInput.css'
import Text from '../components/Text';
import { IconBaseProps } from 'react-icons';

interface TextInputProps {
    type: string,
    label?: string,
    placeHolder?: string,
    width?:string,
    height?: string
    icon?: ReactElement<IconBaseProps>,
}

const TextInput = ({type, label, placeHolder, width, height, icon} : TextInputProps) => {
  return (
    <div>
        <Text content={label} />
        <div className='inputContainer' style={{width: width, height: height}}>
            <input className='body' type={type} placeholder={placeHolder} maxLength={type === 'password' ? 15 : 512}></input>
            <i>{icon}</i>
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