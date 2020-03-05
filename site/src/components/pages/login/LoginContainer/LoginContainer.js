import React, { useState } from 'react';
import { connect } from 'react-redux';

import './LoginContainer.scss';
import { Link, withRouter } from 'react-router-dom';
import { TextField, InputLabel, Button, CircularProgress } from '@material-ui/core';
import { compose } from 'redux';
import Alert from '@material-ui/lab/Alert';
import { loginIn } from '../../../../actions/login-actions';
import { tr } from '../../../../services/i18n/i18n';
import withTranslate from '../../../hocs/withTranslate';

const LoginContainer = (props) => {

    const { wait, error, success } = props;

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { loginIn } = props;
    
    return (
        <div className="login-container">
            <InputLabel className="login-title">{ tr('login.title')}</InputLabel>
            { error && error.type === 'UNKNOWN_DATA'&& 
                <Alert severity="error">{ tr('login.error.badUserData')}</Alert> }
            <TextField
                value={email}
                placeholder={ tr('login.emailPlaceholder')}
                onChange={(e) => setEmail(e.target.value)}/>
            <TextField 
                value={password}
                type="password"
                placeholder={ tr('login.passwordPlaceholder')}
                onChange={(e) => setPassword(e.target.value)}/>
            <Button 
                variant="contained"
                color="primary"
                className="login-submit-btn"
                success={(success).toString()}
                error={error ? "true" : "false"}
                disabled={wait}
                onClick={() => loginIn(email, password)}
            >{ tr('login.enter')}
            { wait && <CircularProgress style={{position: "absolute"}}/> }
            </Button>
            <Link 
                className="login-register-link"
                to="/register"
            >{ tr('login.register') }</Link>
        </div>
    );
};

const mapStateToProps = ({ login: { wait, error, success }}) => {
    return {
        wait, error, success
    }
}
export default compose(
    connect(mapStateToProps, {loginIn}),
    withRouter,
    withTranslate
)(LoginContainer);
