import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import classes from './App.css';
import Loader from './components/UI/Loader/Loader';
import MainPage from './containers/MainPage/MainPage';
import Login from './containers/Login/Login';
import Register from './containers/Register/Register';
import * as actions from './store/actions/index';
import Dashboard from './containers/Dashboard/Dashboard';
import Profile from './containers/Profile/Profile'
import Layout from './hoc/Layout/Layout';

class App extends Component {

  state = {
    hideLoader: false
  }

  componentDidMount() {
    this.props.onTryAutoSignUp();
  }

  render() {
    setTimeout(() => {
      this.setState({ hideLoader: true });
    }, 3000);

    let routes = null;

    this.props.isAuthenticated
      ? routes = (
        <Layout>
          <Switch>
            <Route path='/profile' component={Profile} />
            <Route exact path='/' component={Dashboard} />
            <Redirect to='/' />
          </Switch>
        </Layout>
      )
      : routes = (
        <Switch>
          <Route path='/login' component={Login} />
          <Route path='/register' component={Register} />
          <Route exact path='/' component={MainPage} />
          <Redirect to='/' />
        </Switch>
      );

    return (
      <div className={classes.App}>
        <Loader hide={this.state.hideLoader}/>
        {routes}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.authReducer.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignUp: () => dispatch(actions.authenticationCheckState())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
