import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import classes from './Register.css';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';

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
                    minLength: 6,
                    maxLength: 10
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
            isValid = value.includes('@') && value.includes('.') && isValid;
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

    registerWithEmail = (username, email, password) => {
        console.log(username, email, password);
    }

    registerWithFacebook = () => {
        console.log('Registered in with facebook');
    }

    render() {
        const formElementsArray = [];
        for (let key in this.state.registerForm) {
            formElementsArray.push({
                id: key,
                config: this.state.registerForm[key]
            });
        }

<<<<<<< HEAD
        let errorMessage = "";
        if (this.props.error) {
            switch (this.props.error.message) {
                case 'EMAIL_EXISTS':
                    errorMessage = 'That Email address already exists.';
                    break;
                case 'OPERATION_NOT_ALLOWED':
                    errorMessage = 'Operation not allowed.';
                    break;
                case 'TOO_MANY_ATTEMPTS_TRY_LATER':
                    errorMessage = 'Too many attempts. Try again later.';
                    break;
                default:
                    errorMessage = 'Unknown Error';
                    break;
            }
        }

        let form = (
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
                {this.props.error ? <p style={{ color: 'red' }}>{errorMessage}</p> : null}
                <Button
                    value="Sign up"
                    buttonType="green"
                    disabled={!this.state.formIsValid}
                    click={() => this.registerWithEmail(this.state.registerForm.email.value,
                        this.state.registerForm.password.value, this.state.registerForm.username.value)}
                />
            </div>
        );

        if (this.props.loading) {
            form = <div className={classes.SpinnerWrapper}><Spinner /></div>
        }

||||||| 6568df6... Dashboard
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

=======
>>>>>>> parent of 6568df6... Dashboard
        return (
            <div className={classes.Background}>
<<<<<<< HEAD
                {this.props.isAuthenticated ? <Redirect to='/' /> : null}
                {form}
||||||| 6568df6... Dashboard
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
=======
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
                        value="Sign up"
                        buttonType="green"
                        disabled={!this.state.formIsValid}
                        click={() => this.registerWithEmail(this.state.registerForm.email.value,
                            this.state.registerForm.password.value, this.state.registerForm.username.value)}
                    />
                    <Button
                        value="Sign up with FaceBook"
                        buttonType="blue"
                        click={this.registerWithFacebook}
                    />
                </div>
>>>>>>> parent of 6568df6... Dashboard
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

export default Register;