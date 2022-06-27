import React, { useContext } from 'react'
import Button from '../components/Button';
import Link from '../components/Link';
import Text from '../components/Text';
import TextInput from '../components/TextInput';
import { FcGoogle} from "react-icons/fc";
import {BsArrowLeft} from "react-icons/bs"
import '../styles/Login.css'
import {app} from '../firebaseConfig'
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from '../Auth';


const Login = () => {

    //const [validCredentials, setCredentialsStatus] = useState(false);
    const auth = getAuth(app);
    let navigate = useNavigate();
    const collectInfos = async () => {
        const loginInfos = {
            "email" : (document.getElementsByClassName('inputContainer')[0].firstChild as HTMLInputElement).value,
            "password" : (document.getElementsByClassName('inputContainer')[1].firstChild as HTMLInputElement).value,
        }
        signInWithEmailAndPassword(auth, loginInfos.email, loginInfos.password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log(user.emailVerified)
                
                navigate("/User/Discover", { replace: true });
                // ...
            })
            .catch((error) => {
                //const errorCode = error.code;
                const errorMessage = error.message;
                alert(errorMessage)
            });
    }

    const signUpWithGoogle = async () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential?.accessToken;
            // The signed-in user info.
            const user = result.user;
            console.log(user, token, credential);
            // ...
            }).catch((error) => {
                // Handle Errors here.
                //const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                //const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
                alert({errorMessage, credential});

                // ...
            });
    }

    const { currentUser } = useContext(AuthContext);

  if (currentUser) {
    return <Navigate to="/User/Discover" />;
  }

  return (
    <div className='LoginPage'>
        <a className='ArrowBack' href='/'><BsArrowLeft size={40}/></a>
        <div className='LoginContainer'>
            <section className='LoginHeader'>
                <img src='logo.svg' alt = ' test' height="87"width="50"></img>
                <Text type='H3' content='Name of app'/>
            </section>
            <TextInput label='Email' placeHolder='ex: jDoe@gmail.com'/>
            <section className='PasswordSection'>
                <Link underlined={false} content='Forgot password?'/>
                <TextInput type='password' placeHolder='Enter password'/>
            </section>
            <section className='Separator'>
                <hr />
                <Text type='H2' content='OR'/>
                <hr />
            </section>
            <Button textType='H2' text='Sign in with Google' icon={<FcGoogle size={40} />} fct={signUpWithGoogle} />
            <section className='LoginSection'>
                <Button textType='H2' text='Login' fct={collectInfos}/>
            </section>
            <section className='SignUpSection'>
                <Text type='H3' content="Don't have an account?"/>
                <Link underlined={true} content='Sign-up' url='/Sign-up'/>
            </section>
        </div>
    </div>
  )
}

export default Login