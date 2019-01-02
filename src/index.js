import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import axios from 'axios';

axios.defaults.baseURL = 'https://www.goodreads.com';
axios.defaults.apiKey = 'F3Bik4kyfevhEVa9X2Y9dQ';
axios.defaults.apiSecret = 'WBCoe9yr3o0xiKpDZGy1l7PjGx6PqoapWotLuAc';

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
