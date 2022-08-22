import React, { useContext, useEffect, useState } from 'react'
import LeftSidePane from '../components/LeftSidePane'
import NavBar from '../components/NavBar'
import NewsArticle from '../components/NewsArticle'
import RightSidePane from '../components/RightSidePane'
import Switch from '../components/Switch'
import { DataContext } from '../DataContext'
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

    let url = '';
    let articleList:any[] = [];
    let sample:any[] = [];
    let filters = '';
    let arrayList = data.news_options.trim().split(' ');

    arrayList.forEach(async (filter:any) => {
      if(filter !== '') {
        filters = `category=${filter.toLowerCase()}`

        if(filter === 'All') {
          url = 'https://newsapi.org/v2/top-headlines?' +
                'country=ca&' +
                'apiKey=5b227cdd668347119cb253da9ae1deae';
        }
        else {
          url = 'https://newsapi.org/v2/top-headlines?' +
                filters +
                `${local ? '&contry=ca' : ''}` +
                '&language=en' +
                '&apiKey=5b227cdd668347119cb253da9ae1deae';
        }
        
        let req = new Request(url);
        await fetch(req)
            .then(function(response) {
              response.json().then((data) => {
                data.articles.forEach((article:any) => articleList.push(article));
              })
    
              sample = articleList.map((v:any) =>({ v, sort: Math.random()*arrayList.length 
              })).sort((a, b) =>  {
                if(a.sort < b.sort) return -1;
                if(a.sort > b.sort) return 1;
                else return 0;
              }).map((value:any) => value.v).splice(0, 20);

              setNewsArticles(sample);
            })
      } 
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