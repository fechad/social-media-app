import React from 'react'
import Text from '../components/Text'
import { getAuth, signOut  } from "firebase/auth";
import Button from '../components/Button';
import { app } from '../firebaseConfig';
import { useNavigate } from "react-router-dom";
import NavBar from '../components/NavBar';
import LeftSidePane from '../components/LeftSidePane';
import RightSidePane from '../components/RightSidePane';
import '../styles/Discover.scss'

function  getUserEmail() {
    const auth = getAuth(app);
    const user = auth.currentUser;
    return user!.email

}
const Discover = () => {


    let navigate = useNavigate();
   

    function signOutOfWebsite(){
        const auth = getAuth(app);
        signOut(auth).then(() => {
            // Sign-out successful.
            alert('Signed out');
            navigate("/", { replace: true });
          }).catch((error) => {
            // An error happened.
          });
    }

  return (
    <div>
        <div className='LeftSideContainer'><LeftSidePane /></div>
        <div>
          <NavBar selection='discover' />
          <Text type='H1' content={` ${process.env.NODE_ENV}  Welcome to our app ${getUserEmail()}`} />
          <Button text='Sign out' fct={signOutOfWebsite} />
        </div>
        <div className ='RightSideContainer'><RightSidePane /></div>
        
        
        
    </div>
  )
}

export default Discover