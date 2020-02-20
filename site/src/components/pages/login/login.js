import React from 'react';
import LoginContainer from './login-container/login-container';
import { loginIn } from '../../../actions/loginActions';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';

import './login.scss';
import VerifyPanel from './VerifyPanel';

const Login = (props) => {

    const { loginIn, loggedIn, error } = props;
    
    if(loggedIn === 'wait') return <span>"WAIT"</span>;
    if(loggedIn === true) return <Redirect to="/"/>
    
    const verifyPanel = error && error.type === 'NEED_VERIFY_EMAIL';

    return ( 
        <div className="login-page">
            { !verifyPanel && <LoginContainer onLoginIn={loginIn} /> }
            { verifyPanel && <VerifyPanel link={error.devLink} /> }
        </div>
     );
}

const mapStateToProps = ({ user: { loggedIn }, login: { error } }) => {
    return {
        loggedIn,
        error
    }
}

export default withRouter(connect(mapStateToProps, { loginIn })(Login));