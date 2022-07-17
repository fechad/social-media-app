import React from 'react'
import LeftSidePane from '../components/LeftSidePane'
import NavBar from '../components/NavBar'
import RightSidePane from '../components/RightSidePane'

const NewsFeed = () => {
  return (
    <div>
      <div className='LeftSideContainer'><LeftSidePane /></div>
      <div>
        <NavBar selection='newsFeed' />
        NewsFeed
      </div>
      <div className ='RightSideContainer'><RightSidePane /></div>
    </div>
  )
}

export default NewsFeed