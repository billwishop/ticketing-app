import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { TicketingApp } from './components/TicketingApp';
import './index.css';
import reportWebVitals from './reportWebVitals';

console.log('you rock')

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <TicketingApp />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
