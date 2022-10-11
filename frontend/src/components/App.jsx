import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import HeaderPage from './HeaderPage.jsx';
import LoginPage from './LoginPage.jsx';
import RegistrationPage from './RegistrationPage.jsx';
import ChatPage from './ChatPage.jsx';
import NotFoundPage from './NotFoundPage.jsx';
import AuthProvider from '../contexts/AuthProvider.jsx';
import { useAuth } from '../hooks/index.js';
import 'react-toastify/dist/ReactToastify.css';
import {
  pathChatPage,
  pathLoginPage,
  pathSignUpPage,
  pathEmpty,
  pathNotFound
} from '../routes.js';

const Private = ({ toChatPage } = false) => {
  const auth = useAuth();

  if (toChatPage) {
    return auth.user ? <Outlet /> : <Navigate to="/login" />;
  }
  return auth.user ? <Navigate to="/" /> : <Outlet />;
};

const App = () => (
  <AuthProvider>
    <BrowserRouter>
      <div className="d-flex flex-column h-100">
        <HeaderPage />
        <Routes>
          <Route path={pathChatPage} element={<Private toChatPage />}>
            <Route path={pathEmpty} element={<ChatPage />} />
          </Route>
          <Route path={pathLoginPage} element={<Private />}>
            <Route path={pathEmpty} element={<LoginPage />} />
          </Route>
          <Route path={pathSignUpPage} element={<Private />}>
            <Route path={pathEmpty} element={<RegistrationPage />} />
          </Route>
          <Route path={pathNotFound} element={<NotFoundPage />} />
        </Routes>
      </div>
      <ToastContainer />
    </BrowserRouter>
  </AuthProvider>
);

export default App;
