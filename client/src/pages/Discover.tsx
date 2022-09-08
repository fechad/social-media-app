import React, { useContext, useEffect, useState } from 'react'
import Button from '../components/Button';
import NavBar from '../components/NavBar';
import LeftSidePane from '../components/LeftSidePane';
import RightSidePane from '../components/RightSidePane';
import '../styles/Discover.scss'
import Modal from '../components/Modal';
import { environment } from '../environments/environment';
import { FaPhotoVideo } from 'react-icons/fa';
import axios from 'axios';
import { IoMdClose } from 'react-icons/io'
import { DataContext } from '../DataContext';
import Post from '../components/Post';
import { AuthContext } from '../Auth';
import { Snackbar } from '@mui/material';
import { screenRatio } from '../ScreenRatio';

const Discover = () => {

  screenRatio.calculate()

  //let navigate = useNavigate();
  let name: string = '0';
  const {data} = useContext(DataContext);
  const [imagePresent, setImagePresent] = useState(false);
  const [isPhoto, setIsPhoto] = useState(false);
  const [posts, setPost] = useState([{
    'handle': 'none',
    'post_id': '0',
    'media': 'none',
    'text_message': 'none',
    'likes': 0,
    'date': '00-00-00',
    'isVideo': false,
    'comments_number': 0,

  }]);
  const [faveList, setFavorite] = useState([{
    'handle': 'none',
    'post_id': '0',
    'media': 'none',
    'text_message': 'none',
    'likes': 0,
    'date': '00-00-00',
    'isVideo': false,
    'comments_number': 0,

  }]);
  const [liked, setLiked] = useState('');
  const {currentUser} = useContext(AuthContext);
  const [published, confirmPublishing] = useState(false);
  
  const textAreaAdjust = (element: any) => {
    element.style.height = "1px";
    element.style.height = (8+element.scrollHeight)+"px";
  }

  const sendPhoto = () =>{
    const header = {
      headers: {'Content-type': 'multipart/form-data'},
    }
    if((document.getElementById('download') as HTMLInputElement).files![0]) {
      const form = new FormData();
      name = `${Date.now()}${Math.round(Math.random() * 1000)}`
      if ((document.getElementById('download') as HTMLInputElement).files![0].name.slice(-3) === 'mp4') name += '.mp4'
      else name += '.png'
      form.append('image', (document.getElementById('download') as HTMLInputElement).files![0], name); 
      axios.post(`${environment.serverUrl}/database/image`, form, header);
    }
  }

  const uploadFile = () => {
    const file = (document.getElementById('download') as HTMLInputElement).files![0];
    const reader = new FileReader();
    reader.addEventListener('load', ()=>{
      if(file.name.slice(-3) === 'mp4') {
        document.getElementById('previewVid')?.remove();
        document.getElementById('previewPic')?.insertAdjacentHTML('afterend', `<video id= 'previewVid' src = '${reader.result!.toString()}' width = '576' height='240' controls></video>`);
        document.getElementById('previewPic')?.removeAttribute('src');
      }
      else {
        document.getElementById('previewPic')?.setAttribute('src', reader.result!.toString());
        document.getElementById('previewVid')?.remove();
      }
      if(file.name.includes('.png') || file.name.includes('.jpg')) setIsPhoto(true) ;
      else setIsPhoto(false);
      setImagePresent(true);
    });
    reader.readAsDataURL(file);
  }

  const removeFile = () => {
    document.getElementById('previewPic')?.removeAttribute('src');
    document.getElementById('previewVid')?.remove();
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
          'media':  name ? isPhoto ? `./assets/profile-pics/${name}` : `./assets/videos/${name}` : undefined,
          'text_message': message,
          'likes': '0',
          'isVideo': isPhoto,
          'comments_number': '0',
          'date': date
        }),
      }).then(() =>{
        document.getElementById('Publish')?.remove();
        confirmPublishing(true);
      })
  }

  const getPosts = async () => {
    await fetch(`${environment.serverUrl}/database/discover/post`, {
      method: 'GET',
    }).then(function (response: Response) {
      response.json().then((data) => {
        setPost(data);
      })
    })

    await axios.get(`${environment.serverUrl}/database/users/liked/${currentUser.email}`).then((posts)=>{
      setLiked(posts.data[0].posts);
    })
    await axios.get(`${environment.serverUrl}/database/users/favorite/${currentUser.email}`).then((favorite)=>{
        setFavorite(favorite.data);
    })
  }

  const postsList = posts.map((post, index) => {
    let postLiked = liked.split(' ');
    let isLiked = (postLiked.filter(item=>item === post.post_id).length > 0);
    let isFaved = (faveList.filter(item=>item.post_id === post.post_id).length > 0);


    if(post.post_id === '0') return '';

    else {

        return (
          <Post key={`${post.post_id}/${isLiked}/${isFaved}/${post.likes}`} handle={post.handle} media={post.media} username={post.handle} text_message={post.text_message} likes={post.likes} date={post.date} isVideo={post.isVideo} postId = {post.post_id} nbComments = {post.comments_number} isFaved = {isFaved} isLiked = {isLiked}></Post>
        );
    }
});

  useEffect(() => {
      getPosts();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
  }, [liked, faveList])

  return (
    <div id='page-container'>
        <div className='LeftSideContainer'><LeftSidePane /></div>
        <div>
          <NavBar selection='discover' />
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
          <div className='posts-container'>
                  {
                    postsList
                  }
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

export default Discover