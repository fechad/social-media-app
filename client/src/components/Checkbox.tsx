import React from 'react'
import '../styles/Checkbox.css'
import Text from '../components/Text';

const Checkbox = ({text}:{text: string}) => {
  return (
    <div className='Checkbox'>
        <input type="checkbox" />
        <Text content={text}/>
    </div>
  )
}

export default Checkbox