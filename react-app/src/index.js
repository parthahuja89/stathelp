import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Utils from './Utils.js'
import {BrowserRouter} from 'react-router-dom'
import {Route} from 'react-router-dom'

import './index.css';

ReactDOM.render(
  <BrowserRouter>
  <Route exact path='/' component={App}/>
  <Route exact path='/utils' component={Utils}/>
  </BrowserRouter>,
  document.getElementById('root')
);
