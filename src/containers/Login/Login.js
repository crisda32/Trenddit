import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import classes from './Login.css';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';

class Login extends Component {
    state = {
        loginForm: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your E-mail'
                },
                validation: {
                    required: true,
                    validEmail: true
                },
                valid: false,
                touched: false,
                icon: 'mail',
                value: ''
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Your password'
                },
                validation: {
                    required: true,
                    minLength: 8
                },
                valid: false,
                touched: false,
                icon: 'password',
                value: ''
            }
        },
        formIsValid: false
    }

    checkValidity(value, rules) {
        let isValid = true;

        if (!rules) {
            return true;
        }

        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }

        if (rules.validEmail) {
            const regularExpression = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = regularExpression.test(value) && isValid;
        }

        return isValid;
    }

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedLoginForm = {
            ...this.state.loginForm
        }

        const updatedFormElement = {
            ...updatedLoginForm[inputIdentifier]
        }

        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedLoginForm[inputIdentifier] = updatedFormElement;

        let formIsValid = true;
        for (let inputIdentifier in updatedLoginForm) {
            if (updatedLoginForm[inputIdentifier].valid !== undefined) {
                formIsValid = updatedLoginForm[inputIdentifier].valid && formIsValid;
            }
        }

        this.setState({ loginForm: updatedLoginForm, formIsValid: formIsValid });
    }

    loginWithEmail = (email, password) => {
        this.props.onLoginAuthentication(email, password);
    }

    render() {
        const formElementsArray = [];
        for (let key in this.state.loginForm) {
            formElementsArray.push({
                id: key,
                config: this.state.loginForm[key]
            });
        }

        let form = (
            formElementsArray.map(formElement => (
                <Input
                    key={formElement.id}
                    elementType={formElement.config.elementType}
                    elementConfig={formElement.config.elementConfig}
                    value={formElement.config.value}
                    invalid={!formElement.config.valid}
                    shouldValidate={formElement.config.validation}
                    touched={formElement.config.touched}
                    icon={formElement.config.icon}
                    changed={(event) => this.inputChangedHandler(event, formElement.id)}
                />
            ))
        );

        if (this.props.loading) {
            form = <Spinner />
        }

        return (
            <div className={classes.Background}>
                {this.props.isAuthenticated ? <Redirect to='/'/> : null}
                <div className={classes.FormContainer}>
                    <form>
                        {form}
                    </form>
                    <Button
                        value="Log in"
                        buttonType="green"
                        disabled={!this.state.formIsValid}
                        click={() => this.loginWithEmail(this.state.loginForm.email.value,
                            this.state.loginForm.password.value)}
                    />
                </div>
                <div className={classes.Top}>
                    <h1>Trenddit</h1>
                    <p>Log in</p>
                </div>
                <div className={classes.Bottom}>
                    <p>New to Trenddit? <Link to='./register'>Sign up</Link></p>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return{
        onLoginAuthentication: (email, password) => dispatch(actions.logInAuthentication(email, password))
    };
};

const mapStateToProps = state => {
    return{
        loading: state.authReducer.loading,
        error: state.authReducer.error,
        isAuthenticated: state.authReducer.token !== null
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);