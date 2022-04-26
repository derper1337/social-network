import {ErrorMessage, Formik, Form, Field} from "formik";
import {connect} from "react-redux";
import {loginThunkCreator} from "../../../Redux/auth-reducer";
import {Navigate} from "react-router-dom";
import React from "react";
import css from "./Login.module.css"

const Login = (props) => {
    // formik consts
    const initialValues = {
        email: 'free@samuraijs.com',
        password: 'free',
    }
    const validate = (values) => {
        let errors = {};
        if (!values.email) {
            errors.email = "Required field";
        }
        if (!values.password) {
            errors.password = "Required field";
        }
        return errors;
    }
    const onSubmit = (values, {setStatus}) => {
        props.loginThunkCreator(values.email, values.password, values.rememberMe, setStatus);
    }

    if (props.isAuth) return <Navigate replace to="/profile"/>
    else return (
        <Formik onSubmit={onSubmit} initialValues={initialValues} validate={validate}>
            {({status}) => (
                <Form className={css.Login}>
                    <div className={css.LoginContainer}>
                        <div>{status}</div>
                        <label htmlFor={'email'}>Email</label>
                        <Field type={'email'} id={'email'} name={'email'}/>
                        <div className={css.Error}><ErrorMessage name={"email"}/></div>

                        <label htmlFor={'password'}>Password</label>
                        <Field type={'password'} id={'password'} name={'password'}/>
                        <div className={css.Error}><ErrorMessage name={"password"}/></div>
                        <button type='submit'> Submit</button>
                    </div>
                </Form>
            )}
        </Formik>
    );
};

let mapStateToProps = (state) => {
    return {
        isAuth: state.auth.loggedIn,
    }
}

export default connect(mapStateToProps, {loginThunkCreator})(Login);