import React from 'react';
import { func, shape, string } from 'prop-types';
import { Form } from 'informed';

import { mergeClasses } from '../../classify';
import Button from '../Button';
import Field from '../Field';
import LoadingIndicator from '../LoadingIndicator';
import TextInput from '../TextInput';
import { isRequired, validateEmail } from '../../util/formValidators';
import combine from '../../util/combineValidators';

import defaultClasses from './signInPage.css';
import { useSignInPage } from '@magento/peregrine/lib/talons/SignInPage/useSignInPage';
import CREATE_CART_MUTATION from '../../queries/createCart.graphql';
import GET_CUSTOMER_QUERY from '../../queries/getCustomer.graphql';
import SIGN_IN_MUTATION from '../../queries/signIn.graphql';
import GET_CART_DETAILS_QUERY from '../../queries/getCartDetails.graphql';

import { useHistory } from 'react-router-dom';

import SocialButton from '../SocialButton';

const handleSocialLogin = (user) => {
  console.log(user)
}
 
const handleSocialLoginFailure = (err) => {
  console.error(err)
}

const SignIn = props => {
    const classes = mergeClasses(defaultClasses, props.classes);
    const { setDefaultUsername, showCreateAccount, showForgotPassword } = props;
    const history = useHistory();
    const talonProps = useSignInPage({
        createCartMutation: CREATE_CART_MUTATION,
        customerQuery: GET_CUSTOMER_QUERY,
        getCartDetailsQuery: GET_CART_DETAILS_QUERY,
        signInMutation: SIGN_IN_MUTATION,
        setDefaultUsername,
        showCreateAccount,
        showForgotPassword
    });

    const {
        errors,
        formRef,
        handleCreateAccount,
        handleForgotPassword,
        handleSubmit,
        isBusy
    } = talonProps;

    // Map over any errors we get and display an appropriate error.
    const errorMessage = errors.length
        ? errors
              .map(({ message }) => message)
              .reduce((acc, msg) => msg + '\n' + acc, '')
        : null;

    if (isBusy) {
        return (
            <LoadingIndicator>{'Signing In'}</LoadingIndicator>
        );
    }

    return (
        <React.Fragment>
            <h4>Sign In</h4>
            <Form
                ref={formRef}
                className={classes.form}
                onSubmit={handleSubmit}
            >
                <Field label="Email" required={true}>
                    <TextInput
                        autoComplete="email"
                        field="email"
                        validate={combine([isRequired, validateEmail])}
                    />
                </Field>
                <Field label="Password" required={true}>
                    <TextInput
                        autoComplete="current-password"
                        field="password"
                        type="password"
                        validate={isRequired}
                    />
                </Field>
                <div className={classes.signInError}>{errorMessage}</div>
                <div className={classes.signInButton}>
                    <Button priority="high" type="submit">
                        {'Sign In'}
                    </Button>
                </div>
            </Form>
            <div className={classes.forgotPasswordButton}>
                <Button
                    priority="low"
                    type="button"
                    onClick={() => {history.push('forgot-password')}}
                    classes={{
                        root_lowPriority: classes.forgotPasswordButtonRoot
                    }}
                >
                    {'Forgot Password?'}
                </Button>
            </div>
            <div className={classes.createAccountButton}>
                <Button
                    priority="normal"
                    type="button"
                    onClick={() => {history.push('create-account')}}
                >
                    {'Create an Account'}
                </Button>
            </div>
            <SocialButton
              provider='facebook'
              appId='496828070929945'
              onLoginSuccess={handleSocialLogin}
              onLoginFailure={handleSocialLoginFailure}
            >
              Login with Facebook
            </SocialButton>
            <SocialButton
              provider='google'
              appId='BZUQof3jEchwzIOzG5rmETZb'
              onLoginSuccess={handleSocialLogin}
              onLoginFailure={handleSocialLoginFailure}
            >
              Login with Google
            </SocialButton>
        </React.Fragment>
    );
};

export default SignIn;

SignIn.propTypes = {
    classes: shape({
        createAccountButton: string,
        form: string,
        forgotPasswordButton: string,
        forgotPasswordButtonRoot: string,
        root: string,
        signInButton: string,
        signInDivider: string,
        signInError: string
    }),
    setDefaultUsername: func.isRequired,
    showCreateAccount: func.isRequired,
    showForgotPassword: func.isRequired
};
