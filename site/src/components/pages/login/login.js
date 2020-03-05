import React, { useEffect } from 'react';
import LoginContainer from './LoginContainer';
import { loginIn } from '../../../actions/login-actions';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';

import './Login.scss';
import VerifyPanel from './VerifyPanel';
import { WAITING } from '../../../constants';
import { changeDrawerTitle } from '../../../actions/drawer-actions';
import { tr } from '../../../services/i18n/i18n';
import { compose } from 'redux';
import withTranslate from '../../hocs/withTranslate';

const Login = (props) => {

    const { changeDrawerTitle, loginIn, loggedIn, error, language } = props;

    useEffect(() => {
        changeDrawerTitle(tr('login.title'));
    }, [ language ])
    
    if(loggedIn === WAITING) return <span>"WAIT"</span>;
    if(loggedIn === true) return <Redirect to="/"/>
    
    const verifyPanel = error && error.type === 'NEED_VERIFY_EMAIL';

    return ( 
        <div className="login-page">
            { !verifyPanel && <LoginContainer onLoginIn={loginIn} /> }
            { verifyPanel && <VerifyPanel link={error.devLink} /> }
        </div>
     );
}

const mapStateToProps = ({ language, user: { loggedIn }, login: { error } }) => {
    return {
        language,
        loggedIn,
        error
    }
}

export default compose(
    connect(mapStateToProps, { loginIn, changeDrawerTitle }),
    withRouter,
    withTranslate
)(Login);