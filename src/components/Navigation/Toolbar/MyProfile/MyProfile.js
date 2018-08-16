import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import classes from './MyProfile.css';
import * as actions from '../../../../store/actions/index';
import Auxiliar from '../../../../hoc/Auxiliar/Auxiliar';
import DropDown from './DropDown/DropDown';

class MyProfile extends Component {
    logout = () => {        
        this.props.history.push({
            pathname: './'
        });
        this.props.toggleMyProfile();
        this.props.onRemoveSavedPosts();
        this.props.logout();
    }

    render() {
        return (
            <Auxiliar>
                <div className={classes.MyProfile}>
                    <button onClick={this.props.toggleMyProfile}></button>
                    <div>
                        <p className={classes.DisplayName}>{this.props.displayName}</p>
                        <p className={classes.Info}>MyProfile</p>
                    </div>
                </div>                
                <DropDown 
                    show={!this.props.hideMyProfile} 
                    displayName={this.props.displayName} 
                    email={"crisda32@hotmail.com"}
                    logout={this.logout}
                    savedPosts={this.props.savedPosts}
                />
            </Auxiliar>
        );
    };
}

const mapStateToProps = state => {
    return {
        displayName: state.authReducer.displayName,
        hideMyProfile: state.auxReducer.hideMyProfile,
        savedPosts: state.firebaseReducer.savedPosts.length
    };
};

const mapDispatchToProps = dispatch => {
    return {
        toggleMyProfile: () => dispatch(actions.toggleMyProfile()),
        logout: () => dispatch(actions.logout()),
        onRemoveSavedPosts: () => dispatch(actions.removeSavedPosts())
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MyProfile));