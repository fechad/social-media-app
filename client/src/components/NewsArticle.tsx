import React, { useState } from 'react'
import Text from './Text'
import '../styles/NewsArticle.scss'
import { IoMdClose } from 'react-icons/io'
import { FiShare2 } from 'react-icons/fi'

interface ArticleProps { 
    title: string,
    imageURL: string,
    articleUrl: string,
    description: string,
}

function NewsArticle({title, imageURL, articleUrl, description}:ArticleProps) {
//onClick={() =>window.location.replace(articleUrl)}
    const [hovering, setHovering] = useState(false)

    const share = () => {
        window.alert('I want to share');
    }

    return (
        <div className='article'>
            <div className = 'header'onClick={() =>window.location.replace(articleUrl)} >
                <Text content={title} type='H2'/>
            </div>
            <div className='body' style={{backgroundImage: `url(${imageURL})`}} onMouseOver={()=>setHovering(true)} onMouseLeave={()=>setHovering(false)} >
                {hovering ? <button className='share-article'><FiShare2 size={30} onClick={share}/></button> : ''}
                <div className='article-description' onClick={() =>window.location.replace(articleUrl)}>
                    <Text content={description} type='H3' color='white'/>
                </div>
            </div>
        </div>
    )
}



export default NewsArticle