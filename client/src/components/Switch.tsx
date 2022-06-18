import React, {  useState } from 'react'
import '../styles/Switch.css'
import { BsSun } from "react-icons/bs"
import { FaRegMoon } from 'react-icons/fa'


const Switch = () => {
  const [darkMode, setSwitch] = useState(false);
    
  return (
      <div className={`Switch ${darkMode ? 'DarkMode' : 'LightMode'}`} onClick={() => setSwitch(!darkMode)}>
        {darkMode ? <FaRegMoon className='Moon'/>: ''}
        <div id='thumb' className={`${darkMode? 'opened-thumb' : 'closed-thumb'}`} />
        {darkMode ? '': <BsSun className='Sun'/>}
      </div>
  )
}

export default Switch