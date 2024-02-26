import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@mdi/font/css/materialdesignicons.css'
import App from './App';
import { UserProvider } from './global/id_rol.js';

ReactDOM.render(
    <UserProvider>
    <App />
    </UserProvider>,
    document.getElementById('root')
);
