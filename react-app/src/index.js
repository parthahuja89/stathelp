import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Dist from './Distributions';
import Tendency from './Tendency';
import Graphing from './Graphing';
import Landing from './LandingPage';
import {BrowserRouter} from 'react-router-dom'
import {Route} from 'react-router-dom'

import './index.css';

ReactDOM.render(
  <BrowserRouter>
  <Route exact path='/' component = {Landing}/>
  <Route exact path='/web' component={App}/>
  <Route exact path='/utils' component={Tendency}/>
  <Route exact path='/Dist' component={Dist}/>
  <Route exact path= '/Graphing' component = {Graphing}/>
  </BrowserRouter>,
  document.getElementById('root')
);
