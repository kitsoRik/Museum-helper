import React, { useState } from 'react';
import { connect } from 'react-redux';

import './login-container.scss';
import LoginError from './login-error/login-error';
import { Link } from 'react-router-dom';
import { TextField, InputLabel, Button } from '@material-ui/core';

const LoginContainer = (props) => {

    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");

    const { onSubmit } = props;
    
    return (
        <div className="login-container">
            <InputLabel className="login-title">Login</InputLabel>
            <TextField
                placeholder="Login..." 
                onChange={(e) => setLogin(e.target.value)}/>
            <TextField 
                placeholder="Password..."
                onChange={(e) => setPassword(e.target.value)}/>
            <Button 
                variant="contained"
                color="primary"
                className="login-submit-btn"
                onClick={() => onSubmit(login, password)}
            >Login</Button>
            <Link 
                className="login-register-link"
                to="/register"
            >Register</Link>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        
    }
}

const mapDispatchToProps = (dispatch, { onLoginIn }) => {
    return {
        onSubmit: (login, password) => onLoginIn(login, password)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);
