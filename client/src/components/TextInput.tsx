import React, { ReactElement, useEffect, useState } from 'react'
import '../styles/TextInput.scss'
import Text from '../components/Text';
import { IconBaseProps } from 'react-icons';

interface TextInputProps {
    type: string,
    label?: string,
    placeHolder?: string,
    width?:string,
    height?: string
    icon?: ReactElement<IconBaseProps>,
    specialFtc?: Function 
}

const TextInput = ({type, label, placeHolder, width, height, icon, specialFtc} : TextInputProps) => {

  const [value, setState] = useState('');

  useEffect(()=>{
    if(value && specialFtc) {
      specialFtc();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])
  
  return (
    <div>
        {label? <Text content={label} /> : ''}
        <div className='inputContainer' style={{width: `calc(Var(--adjustedRatio)*${width})`, height: `calc(Var(--adjustedRatio)*${height})`}}>
            <input className='body' onChange={e => setState(e.target.value)} value={value} type={type} placeholder={placeHolder} maxLength={type === 'password' ? 15 : 512}></input>
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