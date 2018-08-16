import React, { Component } from 'react';
import { connect } from 'react-redux';

import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import classes from './Layout.css';
import * as actions from '../../store/actions/index';

class Layout extends Component {
    state = {
        start: 0
    }
    componentDidMount(){
        const userId = localStorage.getItem('userId');
        const token = localStorage.getItem('token');
        this.props.onFetchSavedPosts(userId, token);
        if(this.state.start === 0){
            this.setState({start: this.state.start+1});
        }
    }

    render() {
        let main = !this.props.startFetch && this.state.start === 1
                    ? this.props.children
                    : null;
        return (
            <div className={classes.Layout}>
                <Toolbar />
                <main className={classes.Content}>
                    {main}
                </main>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        startFetch: state.firebaseReducer.startFetch
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchSavedPosts: (userId, token) => dispatch(actions.fetchSavedPosts(userId, token))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Layout);