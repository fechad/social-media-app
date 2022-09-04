import React, { useEffect, useState } from 'react'
import { AiOutlineGif } from 'react-icons/ai';
import { BsEmojiSmile } from 'react-icons/bs';
import { FaImage, FaPhotoVideo } from 'react-icons/fa'
import { FiPaperclip } from 'react-icons/fi';
import { IoMdClose } from 'react-icons/io';
import { createPicker } from 'picmo';
import ReactGiphySearchbox from 'perfect-giphy-searchbox'
import '../styles/MessageBar.scss'


const MessageBar = () => {

    const [imagePresent, setImagePresent] = useState(false);
    const [filePresent, setFilePresent] = useState(false);
    const [filename, setFileName] = useState('');
    const [fileURL, setFileURL] = useState<any>();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [isPhoto, setIsPhoto] = useState(false);

    
    const uploadMediaFile = (type?: string) => {
        const file = (document.getElementById('download') as HTMLInputElement).files![0];
        const reader = new FileReader();
        reader.addEventListener('load', ()=>{
          setImagePresent(true);
          setFilePresent(false);
          if(file.name.slice(-3) === 'mp4') {
            setImagePresent(false);
            return;
          }
          document.getElementById('message-bar-previewPic')?.setAttribute('src', reader.result!.toString());
          document.getElementById('message-bar-previewVid')?.remove();
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
        document.getElementById('message-bar-previewVid')?.removeAttribute('src');
        setImagePresent(false);
        setFilePresent(false);
    };


    let mediaName: string = '';
    let fsName: string = '';

    const sendPhoto = () =>{
        if((document.getElementById('download') as HTMLInputElement).files![0]) {
          const form = new FormData();
          mediaName = `${Date.now()}${Math.round(Math.random() * 1000)}`
          if ((document.getElementById('download') as HTMLInputElement).files![0].name.slice(-3) === 'mp4') mediaName += '.mp4'
          else mediaName += '.png'
          form.append('image', (document.getElementById('download') as HTMLInputElement).files![0], mediaName); 
          console.log('photo sent with name:', mediaName);
          //axios.post(`${environment.serverUrl}/database/image`, form);
        };
    };

    const sendFile = () =>{
        if((document.getElementById('download-file') as HTMLInputElement).files![0]) {
          const form = new FormData();
          fsName = `${Date.now()}${Math.round(Math.random() * 1000)}`
          fsName += '.' + (document.getElementById('download-file') as HTMLInputElement).files![0].name.slice(-3)
          form.append('file', (document.getElementById('download-file') as HTMLInputElement).files![0], fsName); 
          console.log('file sent with name:', fsName);
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
                
                if(imagePresent) sendPhoto();
                if(filePresent) sendFile();
                
                const fileName = (document.getElementsByClassName('message-file-preview')[0]?.firstChild as HTMLParagraphElement)?.innerText
                // if gif is sent, use data because serverMedia will be empty
                const submit = new CustomEvent('sendMessage', {bubbles: true, detail: { message: event.target.value.trim(), data: content, file: fileName, serverMediaName: mediaName, serverFsName: fsName}});

                event.target.dispatchEvent(submit);
                event.target.value = '';
                event.preventDefault();
                removeFile();
            };
        };
    };

    const [picker, setEmojiPicker] = useState<any>();
    const [giphyPicker, setGiphyPicker] = useState(false);

    const loadPicker = () => {
        // (document.getElementsByClassName('pickerContainer')[0] as HTMLElement).style.setProperty('display', '')
        // The picker must have a root element to insert itself into
        const rootElement = document.getElementById('pickerContainer') as HTMLElement;

        // Create the picker
        setEmojiPicker(createPicker({ rootElement }));
       
    };

    const loadGiphyPicker = () => {
       setGiphyPicker(true);
    };

    const removePicker = () => {
        picker?.destroy();
        setEmojiPicker(null);
    };

    const removeGiphyPicker = () => {
        setGiphyPicker(false);
    };

    const handleGiphySelect = (item: any) => {
        setImagePresent(true);
        document.getElementById('message-bar-previewPic')?.setAttribute('src', item.images.preview_gif.url);
    };

    useEffect(() => {
        // The picker emits an event when an emoji is selected. Do with it as you will!
        picker?.addEventListener('emoji:select', (event:any) => {
            //console.log('Emoji selected:', event.emoji);
            (document.getElementsByClassName('message-writing-container')[0].querySelector('textarea') as HTMLTextAreaElement ).value += `${event.emoji}`;
        });
    }, [picker])

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
                        <input type = 'file' id = 'download' accept="image/png, image/jpeg" onChange={()=>{uploadMediaFile()}}></input>
                        <label htmlFor="download">
                            <FaImage size={30}/>
                        </label>
                    </div>
                </div>
                <div className='message-option gif-box'>
                    <div id='giphy-pickerContainer' onMouseLeave={()=>removeGiphyPicker()}>
                        {
                            giphyPicker ?
                            <ReactGiphySearchbox
                                wrapperClassName='giphy-search-box'
                                id={Date.now()}
                                apiKey="ZZWcsoCprUpUTZI7bWEsiTSwSLgKR9Xm" // Required: get your on https://developers.giphy.com
                                onSelect={(item:any) => handleGiphySelect(item)}
                            />
                            : ''
                        }
                    </div>
                    <div onClick={() => giphyPicker ? removeGiphyPicker() : loadGiphyPicker()}>
                        <AiOutlineGif size={30}/>
                    </div>
                </div>
                <div className='message-option emoji-option' >
                    <div id='pickerContainer' onMouseLeave={()=>removePicker()}/>
                    <div onClick={() => picker ? removePicker() : loadPicker()}>
                        <BsEmojiSmile size={30}/>
                    </div>
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