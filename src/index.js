import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'antd/dist/antd.css'
import { BrowserRouter as Router, Redirect, Route,Switch } from 'react-router-dom'
import Login from './views/Login';
import ForExp from './ForExp';
import './css/index.css'
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <div id='indexContainer'>
    <Router>
      <Switch>
        <Route path='/login' component={Login} />
        <Route path='/dashboard' component={App} />
        <Redirect from='/' to='/login' exact />
      </Switch>
    </Router>
  </div>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
