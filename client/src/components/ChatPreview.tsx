import React from 'react'
import Avatar from './Avatar'
import Text from './Text'
import '../styles/ChatPreview.scss'

interface ChatPreviewProps { 
    chatId?: string,
    photos: string[],
    names: string[],
    latest: string,
    read: boolean,
    online?: boolean,
    groupChat?: boolean

}

function ChatPreview({chatId, photos, names, latest, read, online, groupChat}:ChatPreviewProps) {
  return (
    <div className='PreviewContainer'>
        <div className='PreviewAvatars'>
            <Avatar photo={photos[0]} online={ photos.length === 1 ? online! : false} inGroup={groupChat}/>
            {
                photos[1] ? <Avatar photo={photos[1]} online={false} inGroup={groupChat} /> : ''
            }
        </div>
        <div className='PreviewTextContent'>
            <div className='PreviewNamesContainer'>
                <div className='PreviewNames'>
                    <Text type={'H3'} bold={true} content={names[0] + `${names[1] ? ', ' + names[1]:''}`}/>
                </div>
                
            </div>
            <div className='PreviewMessageContainer'>
                <div className='PreviewMessage'>
                    <Text type={read ? 'body' : 'H3'} bold={!read} content={latest}/>
                </div>
                
            </div>
        </div>
    </div>
  )
}

export default ChatPreview