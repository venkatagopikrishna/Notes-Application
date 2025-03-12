import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import axios from 'axios';
import CssBaseline from '@mui/material/CssBaseline';

axios.defaults.baseURL = 'http://localhost:5000'
axios.defaults.withCredentials = true;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
  <CssBaseline/>
  <App />
  </>
);

