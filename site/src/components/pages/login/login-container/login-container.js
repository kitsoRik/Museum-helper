import React, { useState } from 'react';
import { connect } from 'react-redux';

import './login-container.scss';
import LoginError from './login-error/login-error';
import { Link } from 'react-router-dom';

const LoginContainer = (props) => {

    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");

    const { error, onSubmit } = props;
    
    return (
        <div className="login-container">
            <h1 className="login-title">Login</h1>
            <LoginError error={error}/>
            <input
                placeholder="Login..." 
                onChange={(e) => setLogin(e.target.value)}/>
            <input 
                placeholder="Password..."
                onChange={(e) => setPassword(e.target.value)}/>
            <button 
                className="login-submit-btn"
                onClick={() => onSubmit(login, password)}
            >Login</button>
            <Link 
                className="login-register-link"
                to="/register"
            >Register</Link>
        </div>
    );
};

const mapStateToProps = (state) => {
    
    return {
        error: state.userData.error
    }
}

const mapDispatchToProps = (dispatch, { onLoginIn }) => {
    return {
        onSubmit: (login, password) => {
            onLoginIn(login, password);
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);
