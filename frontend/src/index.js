import React from 'react';
import ReactDOM from 'react-dom/client';
import { io } from 'socket.io-client';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import init from './init.jsx';

const runApp = async () => {
  const root = ReactDOM.createRoot(document.getElementById('root'));
  const vdom = await init(io());
  root.render(<React.StrictMode>{vdom}</React.StrictMode>);
};

runApp();