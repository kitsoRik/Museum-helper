import React, { useState } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';

import './RegisterContainer.scss';
import { TextField, Button } from '@material-ui/core';
import { registerIn } from '../../../../actions/register-actions';
import Alert from '@material-ui/lab/Alert';
import { WAITING } from '../../../../constants';
import { compose } from 'redux';
import withTranslate from '../../../hocs/withTranslate';
import { tr } from '../../../../services/i18n/i18n';

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
            <h1 className="register-title">{ tr('register.title') }</h1>
            { !!error && <Alert severity="error">{ parseRegisterError(error)}</Alert> }
            <TextField 
                error={ error && error.field === 'username'}
                label={ tr('register.username') }
                value={username}
                onChange={(e) => setUsername(e.target.value) }/>
            <TextField 
                error={ error && error.field === 'email'}
                label={ tr('register.email') }
                value={email}
                onChange={(e) => setEmail(e.target.value) }/>
            <TextField 
                error={ error && error.field === 'password'}
                label={ tr('register.password') }
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value) }/>
            <TextField 
                error={ error && error.field === 'confirm'}
                label={ tr('register.confirm') }
                type="password"
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value) }/>
            <Button
                variant="contained"
                color="primary"
                className="register-submit-btn" 
                onClick={() => registerIn(username, email, password, passwordConfirm)}
            >{ tr('register.register') }</Button>
            <Link
                className="register-login-link" 
                to="/login"
            >{ tr('register.loginIn') }</Link>
        </div>
     );
}

const parseRegisterError = ({ type }) => {
    switch(type) {
        case "EMAIL_IS_NOT_VALID": return tr("register.error.emailIsNotValid")
        case "BUSY_EMAIL": return tr('register.error.emailIsBusy');
        case "BUSY_USERNAME": return tr('register.error.usernameIsBudy');
        case "PASSWORD_LENGTH_LESS": return tr('register.error.passwordLengthLess');
        case "PASSWORDS_IS_NOT_IDENTICAL": return tr('register.error.passwordAndComfirnNotIdentical');
        default: return tr('register.error.unknownError');
    }
} 

const mapStateToProps = ({ register: { waiting, error }}) => {
    return {
        waiting,
        error
    }
}

export default compose(
    connect(mapStateToProps, { registerIn }),
    withRouter,
    withTranslate
)(RegisterContainer);