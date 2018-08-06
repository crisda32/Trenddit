import React, { Component } from 'react';

import Auxiliar from '../Auxiliar/Auxiliar';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import classes from './Layout.css';

class Layout extends Component {
    render() {
        return (
            <Auxiliar>
                <Toolbar/>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Auxiliar>
        );
    }
}

export default Layout;