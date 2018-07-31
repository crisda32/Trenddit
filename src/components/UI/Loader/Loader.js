import React, { Component } from 'react';

import classes from './Loader.css'

class Loader extends Component {
    state = {
        show: true
    }

    componentDidMount(){
        setTimeout(() => {
            this.setState({show:false});
          }, 5001);
    }

    render() {
        let cssClasses = [classes.Loader];
        this.props.hide ? cssClasses.push(classes.Vanished) : null;
        cssClasses = cssClasses.join(' ');

        return (
            this.state.show 
            ? <div className={cssClasses}>
                  <p>Trenddit</p>
              </div> 
            : null
        );
    }
};

export default Loader;