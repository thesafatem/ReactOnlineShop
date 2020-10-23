import React, { ReactElement } from 'react';
import { Formik } from 'formik';
import { Link, withRouter } from 'react-router-dom';
import { User } from '../../database/User';
import { RouteComponentProps } from 'react-router-dom';
// import './index.css';
import Input from "../../shared/Input/Input";

interface LoginFormValues {
    email: string;
    password: string;
}

interface LoginFormErrors {
    email?: string;
    password?: string;
}
interface Props extends RouteComponentProps {
    login: (user: User) => boolean;
    cancel: () => void;
}

function Auth({ login, cancel, history }: Props): ReactElement {
    const handleSubmit = (values: LoginFormValues) => {
        let { email, password } = values;
        email = email.trim();
        password = password.trim();
        let user: User = { email, password, id: 0, name: 'Jonathan', basket:[] };
        const isLoggedIn = login(user);
        if (isLoggedIn) {
            history.push('/profile');
        }
    };

    const validateForm = (values: LoginFormValues) => {
        const errors: LoginFormErrors = {};
        const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (!re.test(values.email)) {
            errors.email = 'Invalid email';
        }
        if (!values.email) {
            errors.email = 'Enter your email!';
        }
        if (!values.password) {
            errors.password = 'Enter your password!';
        }

        return errors;
    };

    return (
        <section id="store" className="store py-5" style={{background: "white"}}>
            <div className="container" >
        <main className="backg">
            <Formik
                onSubmit={(values: LoginFormValues) => handleSubmit(values)}
                validate={validateForm}
                initialValues={{
                    email: '',
                    password: '',
                }}
            >
                {({
                      handleSubmit,
                      handleChange,
                      errors,
                      setFieldTouched,
                      touched,
                      isValid,
                  }) => (
                    <form className="form container" onSubmit={handleSubmit}>
                        <h1>Login</h1>
                        <p>Please fill in this form to login.</p>
                        <Input
                            className=""
                            name="email"
                            onChange={handleChange}
                            onBlur={() => setFieldTouched('email')}
                            touched={touched.email}
                            error={errors.email}
                            placeholder="Type your email"
                        />
                        <Input
                            className=""
                            type="password"
                            name="password"
                            onChange={handleChange}
                            onBlur={() => setFieldTouched('password')}
                            touched={touched.password}
                            error={errors.password}
                            placeholder="Your password"
                        />
                        <button className="registerbtn" type="submit" disabled={!isValid} style={{
                            border: "2px solid black", borderRadius: "5px",
                            // border: "0",
                            backgroundColor: "white",
                            borderColor: "#4CAF50",
                            color: "green",
                            padding: "14px 28px",
                            width: "100%",
                            fontSize: "16px",
                            textAlign: "center",
                            margin: "5px",
                            cursor: "pointer"}}>
                            Submit
                        </button>
                        <div className="container signin">
                            <Link to="/">
                                <button className="cancelbtn" onClick={cancel} type="button" style={{
                                    border: "2px solid black", borderRadius: "5px",
                                    // border: "0",
                                    backgroundColor: "white",
                                    borderColor: "#8B4513",
                                    color: "#8B4513",
                                    padding: "14px 28px",
                                    fontSize: "16px",
                                    textAlign: "center",
                                    width: "100%",
                                    margin: "5px",
                                    cursor: "pointer"}}>
                                    Back to the main page
                                </button>
                            </Link>
                        </div>
                    </form>
                )}
            </Formik>
        </main>
            </div>
         </section>
    );
}

export default withRouter(Auth);