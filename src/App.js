import React from 'react';
import {Provider} from 'react-redux';
import Store from './store';
import './App.css';
import Home from './home'

function App() {
  return (
    <Provider store={Store}>
      <Home/>
    </Provider>
  );
}

export default App;