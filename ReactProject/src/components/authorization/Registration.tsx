import React, { ReactElement } from 'react';
import { Formik } from "formik";
import { Link, withRouter } from 'react-router-dom';
import { User } from '../../database/User';
import { RouteComponentProps } from 'react-router-dom';
// import './index.css';
import Input from "../../shared/Input/Input";

interface RegisterFormValues {
    name: string;
    email: string;
    password: string;
}

interface RegisterFormErrors {
    name?: string;
    email?: string;
    password?: string;
}
interface Props extends RouteComponentProps {
    registrate: (user: User) => boolean;
    cancel: () => void;
}

function Registration({
                          registrate,
                          cancel,
                          history,
                      }: Props): ReactElement {
//   let user: User = { email: '', id: 0, password: '', name: '' };

    const handleSubmit = (values: RegisterFormValues) => {
        let { email, password, name } = values;
        email = email.trim();
        password = password.trim();
        name = name.trim();
        let user: User = { email, password, id: 0, name, basket:[] };
        const isRegistered = registrate(user);
        if (isRegistered) {
            history.push('/auth');
        }
    };

    const validateForm = (values: RegisterFormValues) => {
        const errors: RegisterFormErrors = {};
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

        if (!values.name) {
            errors.name = 'Enter your name!';
        }

        return errors;
    };
    return (
        <section id="store" className="store py-5" style={{background: "white"}}>
            <div className="container" >
        <main className="backg">
            <Formik
                onSubmit={(values) => handleSubmit(values)}
                validate={validateForm}
                initialValues={{
                    name: '',
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
                        <h1>Register</h1>
                        <p>Please fill in this form to create an account.</p>
                        <Input
                            className=""
                            name="name"
                            onChange={handleChange}
                            onBlur={() => setFieldTouched('name')}
                            touched={touched.name}
                            error={errors.name}
                            placeholder="Type your name"
                        />
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
                        <button
                            className="registerbtn"
                            type="submit"
                            //   onClick={() => registrate(user)}
                            //   onSubmit={() => validateUser(user)}
                            style={{
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
                                cursor: "pointer"}}
                        >
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

export default withRouter(Registration);
