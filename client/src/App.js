import React, { Component } from 'react';
import './App.css';
import Chat from './containers/Chat.js';
import Login from './containers/Login';
import Registration from './containers/Registration';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      loginScreen: true,
      registrationScreen: false,
      chatScreen: false
    }
  }
  render() {

    return (
      <div className="App">
        <header className="App-header">
          
        </header>
        {this.state.loginScreen && <Login />}
        {this.state.registrationScreen && <Registration />}
        {this.state.chatScreen && <Chat />}
      </div>
    );
  }
}

export default App;
