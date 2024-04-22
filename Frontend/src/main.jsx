import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';

import Configs from './components/ConfigPage.jsx';
import Profile from './components/ProfilePage.jsx';
import Auth from './components/Auth.jsx';
import Signup from './components/Signup.jsx';
import ForgotPassword from './components/ForgotPassword.jsx';
import ChangeUserPassword from './components/ChangeUserPassword.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/configs',
    element: <Configs />
  },
  {
    path: '/profile',
    element: <Profile />
  },
  {
    path: '/auth',
    element: <Auth />
  },
  {
    path: "/auth/signup",
    element: <Signup />
  },
  {
    path: "/auth/forgotpassword",
    element: <ForgotPassword />
  },
  {
    path: "/auth/forgotpassword/changepassword/:userId/:token",
    element: <ChangeUserPassword />
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
