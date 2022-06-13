import React from 'react'
import '../styles/Link.css'

interface LinkProps {
    underlined?: boolean, 
    content: string,
    url: string,
}

const Link = ({underlined, content, url}:LinkProps) => {
  return (
    <a className='body' href={url} style={{color: '#0047FF', textDecoration: underlined ? 'underline' : 'none'}} > {content}</a>
  )
}

Link.defaultProps = {
    type: false, 
    content: 'Link',
    url: 'https://www.w3schools.com/default.asp',
}

export default Link