import React from 'react'
import Text from '../components/Text'
import { getAuth, signOut  } from "firebase/auth";
import Button from '../components/Button';
import { app } from '../firebaseConfig';
import { useNavigate } from "react-router-dom";
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
        <Text type='H1' content={`Welcome to our app ${getUserEmail()}`} />
        <Button text='Sign out' fct={signOutOfWebsite} />
    </div>
  )
}

export default Discover