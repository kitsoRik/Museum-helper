import React, { useState } from 'react';
import { connect } from 'react-redux';

import './login-container.scss';
import LoginError from './login-error/login-error';
import { Link, withRouter } from 'react-router-dom';
import { TextField, InputLabel, Button, CircularProgress } from '@material-ui/core';
import { compose } from 'redux';
import Alert from '@material-ui/lab/Alert';

const LoginContainer = (props) => {

    const { wait, error, success } = props;

    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");

    const { onSubmit } = props;

    return (
        <div className="login-container">
            <InputLabel className="login-title">Login</InputLabel>
            { error && <Alert severity="error">Bad user data</Alert> }
            <TextField
                value={login}
                placeholder="Login..." 
                onChange={(e) => setLogin(e.target.value)}/>
            <TextField 
            
                value={password}
                placeholder="Password..."
                onChange={(e) => setPassword(e.target.value)}/>
            <Button 
                variant="contained"
                color="primary"
                className="login-submit-btn"
                success={(success).toString()}
                error={(error).toString()}
                disabled={wait}
                onClick={() => onSubmit(login, password)}
            >Login
            { wait && <CircularProgress style={{position: "absolute"}}/> }
            </Button>
            <Link 
                className="login-register-link"
                to="/register"
            >Register</Link>
        </div>
    );
};

const mapStateToProps = ({ login: { wait, error, success }}) => {
    return {
        wait, error, success
    }
}

const mapDispatchToProps = (dispatch, { onLoginIn }) => {
    return {
        onSubmit: (login, password) => onLoginIn(login, password)
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withRouter
)(LoginContainer);
