import React, { Component } from 'react';

import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import classes from './Layout.css';

class Layout extends Component {
    render() {
        return (
            <div className={classes.Layout}>
                <Toolbar />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </div>
        );
    }
}

export default Layout;