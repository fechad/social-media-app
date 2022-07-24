import React from 'react'
import { environment } from '../environments/environment'
import Avatar from './Avatar'
import Text from './Text'
import '../styles/UserSearchPreview.scss'

interface UserSearchPreviewProps { 
    account_name: string,
    handle: string,
    profile_pic: string

}

function UserSearchPreview({account_name, handle, profile_pic}:UserSearchPreviewProps) {
  return (
    //add onclick navigation
    <div className='UserPreviewContainer'>
        <Avatar photo={`${environment.serverUrl}/image/${profile_pic.replace('./assets/profile-pics/', '')}`} online={false} inGroup={false}/>
        <div className='PreviewName'>
            <Text type={'H3'} bold={true} content={account_name}/>
        </div>
    </div>
  )
}


export default UserSearchPreview