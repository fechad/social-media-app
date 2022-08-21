import React, { useContext, useState } from 'react'
import LeftSidePane from '../components/LeftSidePane'
import NavBar from '../components/NavBar'
import RightSidePane from '../components/RightSidePane'
import Switch from '../components/Switch'
import { DataContext } from '../DataContext'

const NewsFeed = () => {
  
  const {data} = useContext(DataContext);
  const [local, changeToLocal] = useState(false);
  const [newsArticles, setNewsArticles] = useState([{
    title: '',
    url: '',
    imageUrl: ''
  }])

  const getArticles = () => {

  }


  return (
    <div>
      <div className='LeftSideContainer'><LeftSidePane /></div>
      <div>
        <NavBar selection='newsFeed' />
        <div>
          <Switch resp='' role={() => changeToLocal(true)} />
        </div>
        <div>
          {
            newsArticles.map((article, index) => {

              return(
                <div></div>
              )
            })
          }
        </div>
      </div>
      <div className ='RightSideContainer'><RightSidePane /></div>
    </div>
  )
}

export default NewsFeed