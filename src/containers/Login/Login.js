import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import classes from './Login.css';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';

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
            isValid = value.includes('@') && value.includes('.') && isValid;
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
        console.log(email, password);
    }

    loginWithFacebook = () => {
        console.log('Logged in with facebook');
    }

    render() {
        const formElementsArray = [];
        for (let key in this.state.loginForm) {
            formElementsArray.push({
                id: key,
                config: this.state.loginForm[key]
            });
        }

        return (
            <div className={classes.Background}>
                <div className={classes.FormContainer}>
                    <form>
                        {formElementsArray.map(formElement => (
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
                        ))}
                    </form>
                    <Button
                        value="Log in"
                        buttonType="green"
                        disabled={!this.state.formIsValid}
                        click={() => this.loginWithEmail(this.state.loginForm.email.value,
                            this.state.loginForm.password.value)}
                    />
                    <Button
                        value="Log in with FaceBook"
                        buttonType="blue"
                        click={this.loginWithFacebook}
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

export default Login;