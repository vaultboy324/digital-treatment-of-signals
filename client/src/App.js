import React, { Component } from 'react';
import {Container} from 'react-bootstrap';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import logo from './logo.svg';
import './App.css';

import PageNegative from './pages/PageNegative'

class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={PageNegative}/>
            <Route exact path="/negative" component={PageNegative}/>
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
