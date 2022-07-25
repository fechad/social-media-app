import React, {useEffect, useState} from 'react'
import '../styles/Tabs.scss'
import Text from '../components/Text';


interface TabsProps { 
    tabs: string
    pages: Function[]
}

const Tabs = ({tabs, pages} : TabsProps) => {
    const [selected, changeSelected] = useState('0');
    useEffect(()=>{document.getElementById(selected)?.setAttribute('style', 'border-bottom: 3px solid #8773F0'); console.log(selected)}, [selected]);
    const headers = tabs.split(';').map((header, index) => {
    return (
        <div id = {`${index}`}onClick={()=>{document.getElementById(selected)?.setAttribute('style', 'border-bottom: none'); changeSelected(`${index}`)}}>
            <Text key = {index} content = {`${header}`} type = 'H2'></Text>
        </div>
    )
    });

    return (
        <div>
            <div className='post-container'>
                {headers}
            </div>
        </div>
    )
}

Tabs.defaultProps = {
    tabs: 'Publication;Favorite Post',
    pages: [
        ()=>{return (<div>page 1</div>)},
        ()=>{return (<div>page 2</div>)},
    ]
}

export default Tabs