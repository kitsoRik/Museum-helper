import React, { useState } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';

import './register-container.scss';
import { TextField, Button } from '@material-ui/core';
import { registerIn } from '../../../../actions/registerActions';
import Alert from '@material-ui/lab/Alert';
import { WAITING } from '../../../../constants';

const RegisterContainer = (props) => {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");

    const { waiting, error } = props;
    const { registerIn } = props;

    if(waiting === WAITING) return "WAIT";
    return ( 
        <div className="register-container">
            <h1 className="register-title">Register</h1>
            { !!error && <Alert severity="error">{ parseRegisterError(error)}</Alert> }
            <TextField 
                error={ error && error.field === 'username'}
                label="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value) }/>
            <TextField 
                error={ error && error.field === 'email'}
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value) }/>
            <TextField 
                error={ error && error.field === 'password'}
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value) }/>
            <TextField 
                error={ error && error.field === 'confirm'}
                label="Confirm"
                type="password"
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value) }/>
            <Button
                variant="contained"
                color="primary"
                className="register-submit-btn" 
                onClick={() => registerIn(username, email, password, passwordConfirm)}
            >Register</Button>
            <Link
                className="register-login-link" 
                to="/login"
            >Login in</Link>
        </div>
     );
}

const parseRegisterError = ({ type }) => {
    switch(type) {
        case "BUSY_EMAIL": return "Email is busy";
        case "BUSY_USERNAME": return "Username is busy";
        case "PASSWORD_LENGTH_LESS": return "Password length < 8";
        case "PASSWORDS_IS_NOT_IDENTICAL": return "Password and confirm is not identical";
        default: return "Unknown error";
    }
} 

const mapStateToProps = ({ register: { waiting, error }}) => {
    return {
        waiting,
        error
    }
}

export default withRouter(
    connect(mapStateToProps, { registerIn })(RegisterContainer));