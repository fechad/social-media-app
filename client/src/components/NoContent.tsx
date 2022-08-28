import React from 'react'
import '../styles/NoContent.scss'

interface NoContentProps {
    reason: string
}
const NoContent = ({reason}: NoContentProps) => {
  return (
    <div className='no-content-container'>
        <p style={{fontSize: '35px'}}>
            Oops...
        </p>
        <p style={{fontSize: '35px'}}>
            No {reason}
        </p>
    </div>
  )
}

export default NoContent