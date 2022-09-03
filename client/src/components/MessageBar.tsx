import EventEmitter from 'events';
import React, { useEffect, useState } from 'react'
import { AiOutlineGif } from 'react-icons/ai';
import { BsEmojiSmile } from 'react-icons/bs';
import { FaPhotoVideo } from 'react-icons/fa'
import { FiPaperclip } from 'react-icons/fi';
import { IoMdClose } from 'react-icons/io';
import '../styles/MessageBar.scss'

const MessageBar = () => {

    const [imagePresent, setImagePresent] = useState(false);
    const [isPhoto, setIsPhoto] = useState(false);
    
    const uploadFile = () => {
        const file = (document.getElementById('download') as HTMLInputElement).files![0];
        const reader = new FileReader();
        reader.addEventListener('load', ()=>{
          if(file.name.slice(-3) === 'mp4') {
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

    const textAreaAdjust = (element: any) => {
        element.style.height = "1px";
        element.style.height = (8+element.scrollHeight)+"px";
        //window.scrollTo({left: 0, top: 2});
    }

    const handleKey = (event: any) => {
        if( !event.shiftKey) {
            if(event.key === 'Enter' && event.target.value.trim() !== '') {

                const submit = new CustomEvent('sendMessage', {bubbles: true, detail: event.target.value.trim()});

                event.target.dispatchEvent(submit);
            }
        }
    }

  return (
    <div className='message-bar-container'>
       {
        imagePresent ?  
        <div className='message-photo-preview'>
            <button className='RemovePhoto'><IoMdClose size={30} color='white' onClick={removeFile}/></button> 
            <img id = 'previewPic' src='' alt="" width='576px' style={{maxHeight:'240px', borderRadius:'16px'}}/>
        </div>
        : ''
       }
        <div className='message-options'>
            <div className='message-option'>
                <FiPaperclip size={30}/>
            </div>
            <div className='message-option'>
                <div className='UploadButton'>
                    <input type = 'file' id = 'download' onChange={()=>{uploadFile()}}></input>
                    <label htmlFor="download">
                        <FaPhotoVideo size={30}/>
                    </label>
                </div>
            </div>
            <div className='message-option gif-box'>
                <AiOutlineGif size={30}/>
            </div>
            <div className='message-option'>
                <BsEmojiSmile size={30}/>
            </div>
        </div>
        <div className='message-writing-container'>
            <textarea style={{resize: 'none'}} maxLength={512} placeholder='Type your message' onKeyPress={(e) => handleKey(e)} onKeyUp={(e) => textAreaAdjust(e.target)}/>
        </div>
    </div>
  )
}

export default MessageBar