import React, { useState } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';

import './register-container.scss';
import { TextField, Button } from '@material-ui/core';
import { registerIn } from '../../../../actions/registerActions';

const RegisterContainer = (props) => {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");

    const { registerIn } = props;

    return ( 
        <div className="register-container">
            <h1 className="register-title">Register</h1>
            <TextField 
                placeholder="Username..." 
                onChange={(e) => setUsername(e.target.value) }/>
            <TextField 
                placeholder="Email..." 
                onChange={(e) => setEmail(e.target.value) }/>
            <TextField 
                type="password"
                placeholder="Password..." 
                onChange={(e) => setPassword(e.target.value) }/>
            <TextField 
                type="password"
                placeholder="Password..." 
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
 
export default withRouter(
    connect(null, { registerIn })(RegisterContainer));