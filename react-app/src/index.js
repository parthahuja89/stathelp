import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Utils from './Utils.js';
import Dist from './utils_components/Distributions'

import {BrowserRouter} from 'react-router-dom'
import {Route} from 'react-router-dom'

import './index.css';

ReactDOM.render(
  <BrowserRouter>
  <Route exact path='/' component={App}/>
  <Route exact path='/utils' component={Utils}/>
  <Route exact path='/Dist' component={Dist}/>
  </BrowserRouter>,
  document.getElementById('root')
);
