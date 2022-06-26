import React from 'react'
import Text from '../components/Text'
import { getAuth } from "firebase/auth";

const Discover = () => {

    function  getUserName(){
        const auth = getAuth();
        const user = auth.currentUser;
        return user?.displayName;
    }

  return (
    <div>
        <Text type='H1' content={`Welcome to our app ${getUserName}`} />
    </div>
  )
}

export default Discover