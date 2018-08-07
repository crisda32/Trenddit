import React, { Component } from 'react';
import { connect } from 'react-redux';

import classes from './MyProfile.css';
import * as actions from '../../../../store/actions/index';
import Auxiliar from '../../../../hoc/Auxiliar/Auxiliar';
import DropDown from './DropDown/DropDown';

class MyProfile extends Component {
    render() {
        let profileIcon = require('../../../../assets/Icons/profile.png');
        return (
            <Auxiliar>
                <div className={classes.MyProfile}>
                    <button onClick={this.props.toggleMyProfile}>
                        <img src={profileIcon} alt="profile-icon" />
                    </button>
                    <div>
                        <p className={classes.DisplayName}>{this.props.displayName}</p>
                        <p className={classes.Info}>MyProfile</p>
                    </div>
                </div>{/* 
                
                <DropDown show={this.props.toggleMyProfile}/> */}
            </Auxiliar>
        );
    };
}

const mapStateToProps = state => {
    return {
        displayName: state.authReducer.displayName,
        hideMyProfile: state.auxReducer.hideMyProfile
    };
};

const mapDispatchToProps = dispatch => {
    return {
        toggleMyProfile: () => dispatch(actions.toggleMyProfile())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyProfile);