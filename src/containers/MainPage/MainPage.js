import React, { Component } from 'react';

import Button from '../../components/UI/Button/Button';
import classes from './MainPage.css';

class MainPage extends Component {
    state = {
        cssClasses: [
            classes.Container
        ]
    }

    goToLogin = () => {
        let cssClasses = [...this.state.cssClasses];
        cssClasses.push(classes.Vanished);
        this.setState({ cssClasses: cssClasses });
        setTimeout(() => {
            this.props.history.push({
                pathname: '/login'
            });
        }, 710);
    }

    goToRegister = () => {
        let cssClasses = [...this.state.cssClasses];
        cssClasses.push(classes.Vanished);
        this.setState({ cssClasses: cssClasses });
        setTimeout(() => {
            this.props.history.push({
                pathname: '/register'
            });
        }, 710);
    }

    render() {
        let cssClasses = [...this.state.cssClasses];
        cssClasses = cssClasses.join(' ');
        return (
            <div className={cssClasses}>
                <h1>Trenddit</h1>
                <div className={classes.Buttons}>
                    <Button
                        value="Log in"
                        buttonType="white"
                        click={this.goToLogin}
                    />
                    <Button
                        value="Sign up"
                        buttonType="green"
                        click={this.goToRegister}
                    />
                </div>
            </div>);
    }
};

export default MainPage;