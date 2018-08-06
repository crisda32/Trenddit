import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import classes from './Register.css';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';

class Register extends Component {
    state = {
        registerForm: {
            username: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Select a username'
                },
                validation: {
                    required: true,
                    validUsername: true,
                    minLength: 6
                },
                valid: false,
                touched: false,
                icon: 'username',
                value: ''
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Enter your E-mail'
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
                    placeholder: 'Enter your password'
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

        if (rules.validUsername) {
            isValid = this.isUsernameValid(value) && isValid;
        }

        return isValid;
    }

    isUsernameValid = (value) => {
        return true;
    }

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedRegisterForm = {
            ...this.state.registerForm
        }

        const updatedFormElement = {
            ...updatedRegisterForm[inputIdentifier]
        }

        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedRegisterForm[inputIdentifier] = updatedFormElement;

        let formIsValid = true;
        for (let inputIdentifier in updatedRegisterForm) {
            if (updatedRegisterForm[inputIdentifier].valid !== undefined) {
                formIsValid = updatedRegisterForm[inputIdentifier].valid && formIsValid;
            }
        }

        this.setState({ registerForm: updatedRegisterForm, formIsValid: formIsValid });
    }

    registerWithEmail = (email, password, displayName) => {
        this.props.onRegisterAuthentication(email, password, displayName);
    }

    render() {
        const formElementsArray = [];
        for (let key in this.state.registerForm) {
            formElementsArray.push({
                id: key,
                config: this.state.registerForm[key]
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
                        value="Sign up"
                        buttonType="green"
                        disabled={!this.state.formIsValid}
                        click={() => this.registerWithEmail(this.state.registerForm.email.value,
                            this.state.registerForm.password.value, this.state.registerForm.username.value)}
                    />
                </div>
                <div className={classes.Top}>
                    <h1>Trenddit</h1>
                    <p>Sign up</p>
                </div>
                <div className={classes.Bottom}>
                    <p>Already at Treanddit? <Link to='./login'>Log in</Link></p>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onRegisterAuthentication: (email, password, displayName) => dispatch(actions.signUpAuthentication(email, password, displayName))
    };
};

const mapStateToProps = state => {
    return {
        loading: state.authReducer.loading,
        error: state.authReducer.error,
        isAuthenticated: state.authReducer.token !== null
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);