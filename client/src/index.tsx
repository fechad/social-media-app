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
      <Route  path='/User/Discover'  element={<ProtectedRoute outlet={<Discover />} />}/>
      <Route path='/components' element={<Library/>}/>
      <Route path = 'User/Profile' element = {<ProtectedRoute outlet = {<UserProfile/>}/>}/>
    </Routes>
    </AuthProvider>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
