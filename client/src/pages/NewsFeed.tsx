import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { FaPhotoVideo } from 'react-icons/fa'
import { IoMdClose } from 'react-icons/io'
import Button from '../components/Button'
import LeftSidePane from '../components/LeftSidePane'
import Modal from '../components/Modal'
import NavBar from '../components/NavBar'
import NewsArticle from '../components/NewsArticle'
import RightSidePane from '../components/RightSidePane'
import Switch from '../components/Switch'
import { DataContext } from '../DataContext'
import { environment } from '../environments/environment'
import '../styles/NewsFeed.scss'
import { Snackbar } from '@mui/material';
import { screenRatio } from '../ScreenRatio'

const NewsFeed = () => {

  screenRatio.calculate()

  let name: string = '0';
  const [imagePresent, setImagePresent] = useState(false);
  const [isPhoto, setIsPhoto] = useState(false);
  const [published, confirmPublishing] = useState(false);
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
    let optionList = data.news_options.trim().split(' ');
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

  const textAreaAdjust = (element: any) => {
    element.style.height = "1px";
    element.style.height = (8+element.scrollHeight)+"px";
  }

  const sendPhoto = () =>{
    if((document.getElementById('download') as HTMLInputElement).files![0]) {
      const form = new FormData();
      name = `${Date.now()}${Math.round(Math.random() * 1000)}.png`
      form.append('image', (document.getElementById('download') as HTMLInputElement).files![0], name); 
      axios.post(`${environment.serverUrl}/database/image`, form);
    }
  }

  const uploadFile = () => {
    const file = (document.getElementById('download') as HTMLInputElement).files![0];
    const reader = new FileReader();
    reader.addEventListener('load', ()=>{
      document.getElementById('previewPic')?.setAttribute('src', reader.result!.toString())
      if(reader.result!.toString().includes('.png') || reader.result!.toString().includes('.jpg')) setIsPhoto(true) ;
      else setIsPhoto(false);
      setImagePresent(true);
    });
    reader.readAsDataURL(file);
  }

  const removeFile = () => {
    document.getElementById('previewPic')?.removeAttribute('src');
    setImagePresent(false);
  }

  async function publishPost() {
    sendPhoto();

    const message = (document.getElementsByClassName('post-message')[0] as HTMLTextAreaElement).value;
    let rawDate = new Date();
    const offset = rawDate.getTimezoneOffset();
    rawDate = new Date(rawDate.getTime() - (offset*60*1000));
    let date = rawDate.toISOString().split('T')[0]
    
    await fetch(`${environment.serverUrl}/database/users/post`, {
        method: 'POST',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify({
          'handle': data.handle,
          'post_id': `${Date.now()}${Math.round(Math.random() * 1000)}`,
          'media':  name ? `./assets/profile-pics/${name}` : undefined,
          'text_message': message,
          'likes': '0',
          'isVideo': `${isPhoto}`,
          'comments_number': '0',
          'date': date
        }),
      }).then(() =>{
        document.getElementById('Publish')?.remove();
        confirmPublishing(true);
      })
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
        <div id='Publish'>
            <Modal 
              triggerElement={<Button text='+'/>} 
              title={'Post on Chymera ?'} 
              modalWidth={'624px'} 
              modalHeight={'auto'}
              modalMinHeight={'auto'}
              primary = {'Post'}
              // secondary={'See preview'}
              primaryFct = {publishPost}
              // secondaryFct = {preview}
            >
              <div>
                <div className='PostCreationContainer' style = {{width:'576px', height:'fit-content'}}>
                  <textarea className='post-message' onKeyUp={(e) => textAreaAdjust(e.target)} style = {{width:'99%',maxHeight:'96px', resize: 'none'}} placeholder='Write your post message' maxLength={512}/>
                  <div>
                    {imagePresent ? <button className='RemovePhoto'><IoMdClose size={30} color='white' onClick={removeFile}/></button> : ''}
                    <img id = 'previewPic' src='' alt="" width='576px' style={{maxHeight:'240px', borderRadius:'16px'}}/>
                  </div>
                </div>
                <div className='AdditionalOptions'>
                  <div className='UploadButton'>
                    <input type = 'file' id = 'download' onChange={()=>{uploadFile()}}></input>
                    <label htmlFor="download">
                      <FaPhotoVideo size={30}/>
                    </label>
                  </div>
                  {/* <a></a>
                  <a></a> */}
                </div>
              </div>
            </Modal>
          </div>
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
        <Snackbar
            open={published}
            autoHideDuration={2000}
            onClose={()=> window.location.reload()}
            message="Successfully posted!"
            security='success'
            action={'Ok'}
            onClick={() => window.location.reload()}
            anchorOrigin={{vertical: 'bottom',horizontal: 'center'}}
          />
      </div>
      <div className ='RightSideContainer'><RightSidePane /></div>
    </div>
  )
}

export default NewsFeed