import React, { Component } from 'react';
import { Header } from './Header';
import { Main } from './Main';
import { TOKEN_KEY } from "../constants"

import '../styles/App.css';

class App extends Component {
    state = {
        isLoggedIn: Boolean(localStorage.getItem(TOKEN_KEY)),
    }

    handleLogin = (token) => {
        localStorage.setItem(TOKEN_KEY, token);
        this.setState({isLoggedIn: true});
        //设置有效时间
        //setTimeout(this.handleLogout, 360000);
    }

    handleLogout = () => {
        this.setState({isLoggedIn: false});
        localStorage.removeItem(TOKEN_KEY);
    }

    componentDidMount() {
        window.onbeforeunload = this.handleLogout.bind(this);
    }

  render() {
    return (
      <div className="App">
          <Header isLoggedIn={this.state.isLoggedIn} handleLogout={this.handleLogout}/>
          <Main isLoggedIn={this.state.isLoggedIn} handleLogin={this.handleLogin} />
        <p className="App-intro">
        </p>
      </div>
    );
  }
}

export default App;
