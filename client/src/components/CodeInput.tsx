import React, { useState } from 'react'
import '../styles/CodeInput.scss'

interface CodeInputProps {
    role: Function
}


const CodeInput = ({role}: CodeInputProps) => {

    const [focus, changeFocus] = useState(1)

    function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>){
       
       

        if(event.key === 'Enter'){
            role();
        }
        else if(event.key === 'Backspace'){
            const item = document.getElementById(`${event.currentTarget.id}`);
            console.log(event.currentTarget.id)
            item?.innerText.slice();
            changeFocus(focus-1);
            const nextItem = document.getElementById(`${focus-1}`);
            nextItem?.focus();
        }
        else{
            changeFocus(focus+1);
            const item = document.getElementById(`${focus}`);
            item?.focus();
        }

        if(focus < 1){
            changeFocus(1)
        }
        if(focus > 6){
            changeFocus(6)
        }
    }

  return (
    <form className='CodeInputContainer' >
        <input id='1'type={'text'} maxLength={1}  className='CodeBox H1' autoFocus={focus === 1} onKeyDown={(e) => handleKeyDown(e)}/>
        <input id='2' type={'text'} maxLength={1}  className='CodeBox H1' onKeyDown={(e) => handleKeyDown(e)}/>
        <input id='3' type={'text'} maxLength={1}  className='CodeBox H1' onKeyDown={(e) => handleKeyDown(e)}/>
        <input id='4' type={'text'} maxLength={1}  className='CodeBox H1' onKeyDown={(e) => handleKeyDown(e)}/>
        <input id='5' type={'text'} maxLength={1}  className='CodeBox H1' onKeyDown={(e) => handleKeyDown(e)}/>
        <input id='6' type={'text'} maxLength={1}  className='CodeBox H1' onKeyDown={(e) => handleKeyDown(e)}/>
    </form>
  )
}

export default CodeInput