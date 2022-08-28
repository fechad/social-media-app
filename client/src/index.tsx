import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Library from './pages/Library';
import Login from './pages/Login';
import Credentials from './pages/sign-up/Credentials';
import Confirmation from './pages/sign-up/Confirmation';
import ProfileSetup from './pages/sign-up/ProfileSetup';
import NewOptions from './pages/sign-up/NewOptions';
import Discover from './pages/Discover';
import { AuthProvider } from './Auth';
import ProtectedRoute from './ProtectedRoute';
import UserProfile from './pages/UserProfile';
import MyFeed from './pages/MyFeed';
import NewsFeed from './pages/NewsFeed';
import Notifications from './pages/Notifications';
import Chats from './pages/Chats';
import OtherUserProfile from './pages/OtherUserProfile';
import PostComments from './pages/PostComments';
import UserSettings from './pages/UserSettings';
import { UserDataContext } from './DataContext';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <BrowserRouter>
    <AuthProvider>
    
    <Routes>
      <Route path='/' element={<App/>}>
        <Route index element={<App/>}/>
      </Route>
      <Route path='/login' element={<Login/>}/>
      <Route path='/Sign-up' element={<Credentials/>}/>
      <Route  path='/Sign-up/Confirmation'  element={<ProtectedRoute outlet={<Confirmation />} />}/>
      <Route  path='/User/ProfileSetup'  element={<ProtectedRoute outlet={<ProfileSetup />} />}/>
      <Route  path='/User/NewsOptions'  element={<ProtectedRoute outlet={<NewOptions />} />}/>
      <Route  path='/User/Discover'  element={<ProtectedRoute outlet={<UserDataContext><Discover /></UserDataContext>} />}/>
      <Route  path='/User/MyFeed'  element={<ProtectedRoute outlet={<UserDataContext><MyFeed /></UserDataContext>} />}/>
      <Route  path='/User/NewsFeed'  element={<ProtectedRoute outlet={<UserDataContext><NewsFeed /></UserDataContext>} />}/>
      <Route  path='/User/Notifications'  element={<ProtectedRoute outlet={<UserDataContext><Notifications/></UserDataContext>} />}/>
      <Route  path='/User/Chats'  element={<ProtectedRoute outlet={<Chats/>} />}/>
      <Route path='/components' element={<Library/>}/>
      <Route path = 'User/Profile' element = {<ProtectedRoute outlet = {<UserDataContext><UserProfile/></UserDataContext>}/>}/>
      <Route path = 'User/Profile/:handle' element = {<ProtectedRoute outlet = {<UserDataContext><OtherUserProfile/></UserDataContext>}/>}/>
      <Route path = 'Post/:PostId' element = {<ProtectedRoute outlet = {<PostComments/>}/>}/>
      <Route path = 'User/Settings' element = {<ProtectedRoute outlet = {<UserDataContext><UserSettings/></UserDataContext>}/>}/>
    </Routes>
    
    </AuthProvider>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
