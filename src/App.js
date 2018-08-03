import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import classes from './App.css';
import Loader from './components/UI/Loader/Loader';
import MainPage from './containers/MainPage/MainPage';
import Login from './containers/Login/Login';
import Register from './containers/Register/Register';

class App extends Component {

  state = {
    hideLoader: false
  }

  render() {

    setTimeout(() => {
      this.setState({ hideLoader: true });
    }, 3000);

    return (
      <div className={classes.App}>
        <Loader hide={this.state.hideLoader} />
        <Switch>
          <Route path='/login' component={Login} />
          <Route path='/register' component={Register} />
          <Route path='/' component={MainPage} />
        </Switch>
      </div>
    );
  }
}

export default App;
