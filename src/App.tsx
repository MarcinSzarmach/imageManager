import 'bootstrap/dist/css/bootstrap.css';
import * as React from 'react';
import './App.css';
import ImageManager from "./ImageManager";

import logo from './logo.svg';

class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React App</h1>
        </header>
        <div className="container">
          <ImageManager />
        </div>
      </div>
    );
  }
}

export default App;


