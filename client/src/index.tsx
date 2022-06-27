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

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<App/>}>
        <Route index element={<App/>}/>
      </Route>
      <Route path='/login' element={<Login/>}/>
      <Route path='/Sign-up' element={<Credentials/>}/>
      <Route path='/Sign-up/Confirmation' element={<Confirmation/>}/>
      <Route path='/User/ProfileSetup' element={<ProfileSetup/>}/>
      <Route path='/User/NewsOptions' element={<NewOptions/>}/>
      <Route path='/User/Discover' element={<Discover/>}/>
      <Route path='/components' element={<Library/>}/>
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
