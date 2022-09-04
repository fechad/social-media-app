import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { AiOutlineGif } from 'react-icons/ai';
import { BsEmojiSmile } from 'react-icons/bs';
import { FaPhotoVideo } from 'react-icons/fa'
import { FiPaperclip } from 'react-icons/fi';
import { IoMdClose } from 'react-icons/io';
import { environment } from '../environments/environment';
import '../styles/MessageBar.scss'

const MessageBar = () => {

    const [imagePresent, setImagePresent] = useState(false);
    const [filePresent, setFilePresent] = useState(false);
    const [filename, setFileName] = useState('');
    const [fileURL, setFileURL] = useState<any>();
    const [isPhoto, setIsPhoto] = useState(false);
    
    const uploadMediaFile = (type?: string) => {
        const file = (document.getElementById('download') as HTMLInputElement).files![0];
        const reader = new FileReader();
        reader.addEventListener('load', ()=>{
          setImagePresent(true);
          setFilePresent(false);
          if(file.name.slice(-3) === 'mp4') {
            document.getElementById('message-bar-previewPic')?.insertAdjacentHTML('afterend', `<video id= 'message-bar-previewVid' src = '${reader.result!.toString()}' width = '576' height='240' controls></video>`);
            document.getElementById('message-bar-previewPic')?.removeAttribute('src');
          }
          else {
            document.getElementById('message-bar-previewPic')?.setAttribute('src', reader.result!.toString());
            document.getElementById('message-bar-previewVid')?.remove();
          }
          if(file.name.includes('.png') || file.name.includes('.jpg')) setIsPhoto(true) ;
          else setIsPhoto(false);
        });
        reader.readAsDataURL(file);
    };

    const uploadDocumentFile = (type?: string) => {
        const downloadFile = (document.getElementById('download-file') as HTMLInputElement).files![0];
        const reader = new FileReader();
        reader.addEventListener('load', ()=>{
          setImagePresent(false);
          setFileName(downloadFile.name);
          let blob = new Blob([downloadFile]);
          let url  = URL.createObjectURL(blob);
          setFileURL(url);
          setFilePresent(true);
          setIsPhoto(false);
        });
        reader.readAsDataURL(downloadFile);    
    };

    const removeFile = () => {
        document.getElementById('message-bar-previewPic')?.removeAttribute('src');
        document.getElementById('message-bar-previewVid')?.remove();
        setImagePresent(false);
        setFilePresent(false);
    };

    let name: string = '';
    const sendPhoto = () =>{
        if((document.getElementById('download') as HTMLInputElement).files![0]) {
          const form = new FormData();
          name = `${Date.now()}${Math.round(Math.random() * 1000)}`
          if ((document.getElementById('download') as HTMLInputElement).files![0].name.slice(-3) === 'mp4') name += '.mp4'
          else name += '.png'
          form.append('image', (document.getElementById('download') as HTMLInputElement).files![0], name); 
          console.log('photo sent with name:', name);
          //axios.post(`${environment.serverUrl}/database/image`, form);
        };
    };

    const sendFile = () =>{
        if((document.getElementById('download-file') as HTMLInputElement).files![0]) {
          const form = new FormData();
          name = `${Date.now()}${Math.round(Math.random() * 1000)}`
          name += '.' + (document.getElementById('download-file') as HTMLInputElement).files![0].name.slice(-3)
          form.append('file', (document.getElementById('download-file') as HTMLInputElement).files![0], name); 
          console.log('file sent with name:', name);
          //axios.post(`${environment.serverUrl}/database/image`, form);
        };
    };

    const textAreaAdjust = (element: any) => {
        element.style.height = "1px";
        element.style.height = (8+element.scrollHeight)+"px";
        //window.scrollTo({left: 0, top: 2});
    };

    const handleKey = (event: any) => {
        if( !event.shiftKey) {
            const content = (document.getElementById('message-bar-previewPic') as HTMLImageElement).src;
            if(event.key === 'Enter' && (event.target.value.trim() !== '' || content !== '' || filePresent)) {
                
                const fileName = (document.getElementsByClassName('message-file-preview')[0]?.firstChild as HTMLParagraphElement)?.innerText
                const submit = new CustomEvent('sendMessage', {bubbles: true, detail: { message: event.target.value.trim(), data: content, file: fileName}});

                if(imagePresent) sendPhoto();
                if(filePresent) sendFile();

                event.target.dispatchEvent(submit);
                event.target.value = '';
                event.preventDefault();
                removeFile();
            };
        };
    };


  return (
    <div className='message-bar-container'>
        <div className='message-photo-preview' style={{display: `${imagePresent ? '' : 'none'}`, border: '1px solid darkGrey', borderRadius: '16px'}}>
            <button className='RemovePhoto'><IoMdClose size={30} color='white' onClick={removeFile}/></button> 
            <img id = 'message-bar-previewPic' src='' alt="" width='200px' style={{height:'200px', borderRadius:'16px'}}/>
        </div>
        <div className='message-file-preview' style={{display: `${filePresent ? '' : 'none'}`}}>
            <a href={fileURL} download={filename}>
                <p>{filename}</p>
            </a>
            <button className='RemovePhoto'><IoMdClose size={30} color='white' onClick={removeFile}/></button> 
        </div>
        <div className='actual-bar'>
            <div className='message-options'>
                <div className='message-option'>
                    <div className='UploadButton'>
                        <input type = 'file' id = 'download-file' accept=".docx, .doc, .pdf" onChange={()=>{uploadDocumentFile()}}></input>
                        <label htmlFor="download-file">
                            <FiPaperclip size={30}/>
                        </label>
                    </div>
                </div>
                <div className='message-option'>
                    <div className='UploadButton'>
                        <input type = 'file' id = 'download' accept="image/png, image/jpeg, video/*" onChange={()=>{uploadMediaFile()}}></input>
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
    </div>
  )
}

export default MessageBar