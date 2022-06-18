import { keyboard } from '@testing-library/user-event/dist/keyboard'
import React, { useState } from 'react'
import '../styles/CodeInput.css'

interface CodeInputProps {
    role: Function
}


const CodeInput = ({role}: CodeInputProps) => {

    const [focus, changeFocus] = useState(1)

    function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>){
        if(event.key === 'Enter'){
            role();
        }
        else{
            changeFocus(focus+1);
            const item = document.getElementById(`${focus}`);
            item?.focus();
        }
    }

  return (
    <form className='CodeInputContainer' >
        <input id= '1'type={'text'} maxLength={1}  className='CodeBox H1' autoFocus={focus === 1} onKeyDown={(e) => handleKeyDown(e)}/>
        <input id='2' type={'text'} maxLength={1}  className='CodeBox H1' onKeyDown={(e) => handleKeyDown(e)}/>
        <input id='3' type={'text'} maxLength={1}  className='CodeBox H1' onKeyDown={(e) => handleKeyDown(e)}/>
        <input id='4' type={'text'} maxLength={1}  className='CodeBox H1' onKeyDown={(e) => handleKeyDown(e)}/>
        <input id='5' type={'text'} maxLength={1}  className='CodeBox H1' onKeyDown={(e) => handleKeyDown(e)}/>
        <input id='6' type={'text'} maxLength={1}  className='CodeBox H1' onKeyDown={(e) => handleKeyDown(e)}/>
    </form>
  )
}

export default CodeInput