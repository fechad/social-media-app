import React, { useEffect, useState } from 'react'
import RadioButton from './RadioButton'
import '../styles/RadioButtonPair.scss'

interface RadioButtonPairProps{
    firstText : string,
    secondText: string,
    firstChecked: boolean,
}

const RadioButtonPair = ({firstText, secondText, firstChecked} : RadioButtonPairProps) => {

    const [checked, setState] = useState(firstChecked)

    useEffect(()=>{
        document.getElementById(firstText)?.firstChild?.addEventListener('click', ()=>{
            if(!document.getElementById(firstText)?.firstElementChild?.nextElementSibling?.firstElementChild?.classList.contains('Checked')){
                document.getElementById(firstText)?.firstElementChild?.nextElementSibling?.firstElementChild?.classList.add('Checked');
                document.getElementById(firstText)?.firstElementChild?.nextElementSibling?.firstElementChild?.firstElementChild?.classList.add('Checked');
            } else {
                document.getElementById(firstText)?.firstElementChild?.firstElementChild?.classList.add('Checked');
                document.getElementById(firstText)?.firstElementChild?.firstElementChild?.firstElementChild?.classList.add('Checked');

                document.getElementById(firstText)?.firstElementChild?.nextElementSibling?.firstElementChild?.classList.remove('Checked');
                document.getElementById(firstText)?.firstElementChild?.nextElementSibling?.firstElementChild?.firstElementChild?.classList.remove('Checked');
            }
        })
        document.getElementById(firstText)?.childNodes[1]?.addEventListener('click', ()=>{

            if(!(document.getElementById(firstText)?.childNodes[1]?.previousSibling?.firstChild as HTMLElement).firstElementChild?.classList.contains('Checked')){
                (document.getElementById(firstText)?.childNodes[1]?.previousSibling?.firstChild as HTMLElement).classList.add('Checked');
                (document.getElementById(firstText)?.childNodes[1]?.previousSibling?.firstChild as HTMLElement).firstElementChild?.classList.add('Checked');
            } else {
                (document.getElementById(firstText)?.childNodes[1]?.previousSibling?.firstChild as HTMLElement).classList.add('Checked');
                (document.getElementById(firstText)?.childNodes[1]?.previousSibling?.firstChild as HTMLElement).firstElementChild?.classList.add('Checked');

                (document.getElementById(firstText)?.childNodes[1]?.previousSibling?.firstChild as HTMLElement).classList.remove('Checked');
                (document.getElementById(firstText)?.childNodes[1]?.previousSibling?.firstChild as HTMLElement).firstElementChild?.classList.remove('Checked');
            }
        })
    },[])

  return (
    <div className='RadioOptions' id={firstText}  >
        <RadioButton key={`${firstChecked}`} text={firstText} alreadyChecked={checked} />
        <RadioButton key={`${!firstChecked}`} text={secondText} alreadyChecked={!checked} />
    </div>
  )
}

export default RadioButtonPair