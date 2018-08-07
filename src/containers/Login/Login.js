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

<<<<<<< HEAD
        let errorMessage = "";
        if (this.props.error) {
            switch (this.props.error.message) {
                case 'EMAIL_NOT_FOUND':
                    errorMessage = 'Email not found.';
                    break;
                case 'INVALID_PASSWORD':
                    errorMessage = 'Invalid Password.';
                    break;
                case 'USER_DISABLED':
                    errorMessage = 'User Disabled.';
                    break;
                case 'EMAIL_EXISTS':
                    errorMessage = '';
                    break;
                default:
                    errorMessage = 'Unknown Error.';
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
                    value="Log in"
                    buttonType="green"
                    disabled={!this.state.formIsValid}
                    click={() => this.loginWithEmail(this.state.loginForm.email.value,
                        this.state.loginForm.password.value)}
                />
            </div>
        );

        if (this.props.loading) {
            form = <div className={classes.SpinnerWrapper}><Spinner /></div>;
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
                        value="Log in"
                        buttonType="green"
                        disabled={!this.state.formIsValid}
                        click={() => this.loginWithEmail(this.state.loginForm.email.value,
                            this.state.loginForm.password.value)}
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
>>>>>>> parent of 6568df6... Dashboard
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

<<<<<<< HEAD
const mapDispatchToProps = dispatch => {
    return {
        onLoginAuthentication: (email, password) => dispatch(actions.logInAuthentication(email, password))
    };
};

const mapStateToProps = state => {
    return {
        loading: state.authReducer.loading,
        error: state.authReducer.error,
        isAuthenticated: state.authReducer.token !== null
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
||||||| 6568df6... Dashboard
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
=======
export default Login;
>>>>>>> parent of 6568df6... Dashboard
