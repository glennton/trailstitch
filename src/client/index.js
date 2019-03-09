import React from 'react';
import ReactDOM from 'react-dom';
import Home from './components/Home'
import MainNav from './components/MainNav'

ReactDOM.render(
  <div>
    <MainNav />
    <Home />
  </div>,
  document.getElementById('app')
);

