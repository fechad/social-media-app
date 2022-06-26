import React from 'react'
import Text from '../components/Text'
import { getAuth, signOut  } from "firebase/auth";
import Button from '../components/Button';
import { app } from '../firebaseConfig';
import { useNavigate } from "react-router-dom";

const Discover = () => {


    let navigate = useNavigate();
    function  getUserName(){
        const auth = getAuth();
        const user = auth.currentUser;
        return user?.displayName;
    }

    function signOutOfWebsite(){
        const auth = getAuth(app);
        signOut(auth).then(() => {
            // Sign-out successful.
            navigate("/", { replace: true });
          }).catch((error) => {
            // An error happened.
          });
    }

  return (
    <div>
        <Text type='H1' content={`Welcome to our app ${getUserName}`} />
        <Button text='Sign out' fct={signOutOfWebsite} />
    </div>
  )
}

export default Discover