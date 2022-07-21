import React from 'react'
import { environment } from '../environments/environment'
import Avatar from './Avatar'
import Text from './Text'

interface UserSearchPreview { 
    account_name: string,
    handle: string,
    profile_pic: string

}

function UserSearchPreview({account_name, handle, profile_pic}:UserSearchPreview) {
    console.log(profile_pic)
  return (
    <div className='UserPreviewContainer'>
        <Avatar photo={`${environment.serverUrl}/image/${profile_pic.replace('./assets/profile-pics/', '')}`} online={false} inGroup={false}/>
        <Text type={'H3'} bold={true} content={account_name}/>
    </div>
  )
}


export default UserSearchPreview