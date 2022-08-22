import React, { useContext, useEffect, useState } from 'react'
import LeftSidePane from '../components/LeftSidePane'
import NavBar from '../components/NavBar'
import NewsArticle from '../components/NewsArticle'
import RightSidePane from '../components/RightSidePane'
import Switch from '../components/Switch'
import { DataContext } from '../DataContext'
import { environment } from '../environments/environment'
import '../styles/NewsFeed.scss'

const NewsFeed = () => {
  
  const {data} = useContext(DataContext);
  const [local, changeToLocal] = useState(false);
  const [newsArticles, setNewsArticles] = useState<any>([{
    title: '',
    url: '',
    urlToImage: '',
    description: '',
  }])

  const getArticles = async () => {
    
    let optionsString = local ? 'local;' : '';
    let optionList = data.news_options.split(' ');
    optionList.forEach((option: string, index: number) => {
      if( index < optionList.length) {
        optionsString += option + ';';
      } else {
        optionsString += option;
      }
    });

    await fetch(`${environment.serverUrl}/news/${optionsString}`, {
      method: 'GET'
    }).then((response) =>{
      response.json().then((data) => setNewsArticles(data));
    });
  }

  const handleSwitch = () => {
    changeToLocal(!local);
  }

  useEffect(() => {
    getArticles();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [local])

  return (
    <div>
      <div className='LeftSideContainer'><LeftSidePane /></div>
      <div>
        <NavBar selection='newsFeed' />
        <div>
          <div className='local-switch'>
            <Switch resp='' role={handleSwitch} />
          </div>
          <div className='article-list'>
            {
              newsArticles.map((article: any, index: any) => {

                return(
                  <NewsArticle 
                    key={index}
                    title={article.title} 
                    imageURL={article.urlToImage}
                    articleUrl={article.url} 
                    description={article.description}
                  />
                )
              })
            }
          </div>
        </div>
      </div>
      <div className ='RightSideContainer'><RightSidePane /></div>
    </div>
  )
}

export default NewsFeed