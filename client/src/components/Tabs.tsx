import React, {useEffect, useState} from 'react'
import '../styles/Tabs.scss'
import Text from '../components/Text';


interface TabsProps { 
    tabs: string
    pages: JSX.Element[]
}
function defaultFunction(number: number) {
    return (<div>page {number}</div>)
}
const Tabs = ({tabs, pages} : TabsProps) => {

    const [selected, changeSelected] = useState(0);

    document.documentElement.style.setProperty("--headerWidth", 100/pages.length + "%");

    useEffect(()=>{
        document.getElementById(selected.toString())?.classList.add('selected');
    }, [selected, pages]);

    const headers = tabs.split(';').map((header, index) => {
    return (
        <div className = 'header' id = {`${index}`} onClick={()=>{if(index !== selected)document.getElementById(selected.toString())?.classList.remove('selected'); changeSelected(index)}}>
            <Text key = {index} content = {`${header}`} type = 'H2'></Text>
        </div>
    )
    });

    return (
        <div>
            <div className='post-container'>
                {tabs !== '' ? headers : ''}
            </div>
            <div className='html-container'>
                {pages[selected]}
            </div>
        </div>
    )
}

Tabs.defaultProps = {
    tabs: 'Publications;Favorite Posts',
    pages: [
        defaultFunction(0),
        defaultFunction(1),
    ]
}

export default Tabs