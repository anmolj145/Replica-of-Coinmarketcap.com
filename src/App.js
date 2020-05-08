import React, { Component } from 'react';
import './App.css';
import Header from './Component/Header/Header'
import Home from './Component/Home/Home'
import Detail from './Component/Detail/Detail'

import { BrowserRouter, Route, Switch } from 'react-router-dom';

import store from './store';
import { Provider } from 'react-redux';

class App extends Component {
  render() {
    return (
      <Provider store={store} >
        <BrowserRouter>
          <Header />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/detail" exact component={Detail} />
          </Switch>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;