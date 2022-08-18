import React, { useEffect, useState } from 'react'
import '../styles/RadioButton.scss'
import Text  from '../components/Text'

interface RadioButtonProps{
    text: string,
    alreadyChecked: boolean,
}

const RadioButton = ({text, alreadyChecked}:RadioButtonProps) => {
    const [checked, setState] = useState(alreadyChecked);

    useEffect(() => {},[checked]);

    return (
        <div className='RadioContainer' onClick={ () => setState(!checked)}>
            <div className={`OuterRadio ${checked ? 'Checked' : ''}`}>
                <div className={`InnerRadio ${checked ? 'Checked' : ''}`} />
            </div>
            <Text content={text} type='H3 bold'/>
        </div>
    )
}

export default RadioButton