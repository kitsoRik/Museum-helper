import React, { useState } from 'react';
import { connect } from 'react-redux';
import { getRegisterIn } from '../../../../services/api/api';
import { withRouter, Link } from 'react-router-dom';

import './register-container.scss';
import RegisterError, { minLength, email as ObsEmail, equals } from './register-error/register-error';
import { TextField, Button } from '@material-ui/core';

const RegisterContainer = (props) => {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");

    const { onSubmit } = props;

    const onSubmited = () => {
        const data = {
            username,
            email,
            password,
            passwordConfirm
        }

        onSubmit(data);
    }

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
                onClick={onSubmited}
            >Register</Button>
            <Link
                className="register-login-link" 
                to="/login"
            >Login in</Link>
        </div>
     );
}

const mapStateToProps = (state) => {
    return {

    }
}

const mapDipatchToProps = (dispatch, ownProps) => {
    return {
        onSubmit: (d) => {
            getRegisterIn(d).then((data) => {
                if(data.success) {
                    ownProps.history.push("/login");
                }
            });
        }
    }
}
 
export default withRouter(
    connect(mapStateToProps, mapDipatchToProps)(RegisterContainer));