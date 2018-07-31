import React, { Component } from 'react';

import classes from './App.css';
import Loader from './components/UI/Loader/Loader';
import MainPage from './containers/MainPage/MainPage';

class App extends Component {

  state={
    hideLoader: false
  }

  render() {

    setTimeout(() => {
      this.setState({hideLoader:true});
    }, 3000);

    return (
      <div className={classes.App}>
        <Loader hide={this.state.hideLoader}/>
        <MainPage/>
      </div>
    );
  }
}

export default App;
