import React, { Component } from 'react';
import { func, shape, string } from 'prop-types';
import defaultClasses from './newsletter.css';
import { mergeClasses } from '../../classify';


import Field from '../Field';
import Button from '../Button';
import { Form } from 'informed';
import TextInput from '../TextInput';
import Icon from '../Icon';
import MailIcon from 'react-feather/dist/icons/mail';
import combine from '../../util/combineValidators';
import { isRequired, validateEmail } from '../../util/formValidators';

class Newsletter extends Component {
    static propTypes = {
        classes: shape({
            actions: string,
            error: string,
            lead: string,
            root: string,
            form: string,
            subscribe: string,
            signUp: string,
            signUpText: string,
            inputField: string,
            signUpPolicy: string,
            successMessage: string,
            inProgressMessage: string,
            errorMessage: string
        }),
        createAccountError: shape({
            message: string
        }),
        initialValues: shape({
            email: string,
            firstName: string,
            lastName: string
        })
    };

    static defaultProps = {
        initialValues: {}
    };

    get errorMessage() {
        const { createAccountError } = this.props;

        if (createAccountError) {
            const errorIsEmpty = Object.keys(createAccountError).length === 0;
            if (!errorIsEmpty) {
                return 'An error occurred. Please try again.';
            }
        }
    }

    get initialValues() {
        const { initialValues } = this.props;
        const { email, firstName, lastName, ...rest } = initialValues;

        return {
            customer: { email, firstname: firstName, lastname: lastName },
            ...rest
        };
    }

    handleFormSubmit = async ({ email }) => {
        this.props.signUpForNewsletter({ email });
    };

    render() {
        const { errorMessage, initialValues, props } = this;
        const { classes, isError, isInProgress, isSuccess } = props;
        const mail = <Icon src={MailIcon} size={16} />;

        if (isInProgress) {
            return (
                <React.Fragment>
                <div>
                    <p>
                        Sending your request...
                    </p>
                </div>
                </React.Fragment>
            );
        }

        if (isError) {
            return (
                <React.Fragment>
                <div>
                    <p>
                        Looks like you have already signed up, Thanks!
                    </p>
                </div>
                </React.Fragment>
            );
        }

        if (isSuccess) {
            return (
                <React.Fragment>
                <div>
                    <p>
                        Thanks for signing up for our newsletter
                    </p>
                    <small>
                        emails are subject to our
                        <a href="/privacy-policy"> Privacy Policy</a>
                    </small>
                </div>
                </React.Fragment>
            );
        }

        return (
            <React.Fragment>
                <div className="col-md-3 col-sm-6 col-xs-12 xmt-40 smt-40">
                    <div className="footer">
                        <h2 className="title__line--2">NEWSLETTER </h2>
                        <div className="ft__inner">
                            <div className="news__input">                                
                                <Form
                                    initialValues={initialValues}
                                    onSubmit={this.handleFormSubmit}
                                >
                                    <Field label="Email" required={true}>
                                        <TextInput
                                            field="email"
                                            autoComplete="email"
                                            validate={combine([isRequired, validateEmail])}
                                            validateOnBlur
                                            placeholder="Email"
                                            label="Email"
                                            before={mail}
                                        />
                                    </Field>
                                    <div>{errorMessage}</div>
                                    <div className="send__btn">
                                    <Button className="fr__btn" type="submit" priority="high">
                                        {'Submit'}
                                    </Button>
                                    </div>
                                </Form>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default Newsletter;