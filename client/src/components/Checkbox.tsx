import React from 'react'
import '../styles/Checkbox.css'
import Text from '../components/Text';
import { FaCheck } from 'react-icons/fa';
import { useState } from 'react';



const Checkbox = ({text}:{text: string}) => {

  const [checked, setCheck] = useState(false);

  return (
    <div className='CheckboxContainer'>
        <div className={`Checkbox ${checked || text === 'All'? 'Checked' : ''}`} onClick={() => setCheck(!checked)}><FaCheck color='white'/></div>
        <Text content={text}/>
    </div>
  )
}

export default Checkbox