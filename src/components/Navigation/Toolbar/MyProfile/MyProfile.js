import React, { Component } from 'react';
import {connect} from 'react-redux';

import classes from './MyProfile.css';

class MyProfile extends Component {
    render() {
        let profileIcon = require('../../../../assets/Icons/profile.png');
        return (
            <div className={classes.MyProfile}>
                <img src={profileIcon} alt="profile-icon" />
                <div>
                    <p className={classes.DisplayName}>{this.props.displayName}</p>
                    <p className={classes.Info}>MyProfile</p>
                </div>
            </div>
        );
    };
}

const mapStateToProps = state => {
    return {
        displayName: state.authReducer.displayName
    };
};

export default connect(mapStateToProps)(MyProfile);