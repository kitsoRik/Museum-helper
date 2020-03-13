import React from 'react';
import { connect } from 'react-redux'
import { verifyLinkUrl } from '../../../../services/api/api';
import { Link } from 'react-router-dom';
import { tr } from '../../../../services/i18n/i18n';
import { compose } from 'redux';
import withTranslate from '../../../hocs/withTranslate';

import './VerifyPanel.scss';
import { Button } from '@material-ui/core';
import { exitFromVerify, verifyEmailAgain } from '../../../../actions/login-actions';

const VerifyPanel = ({ exitFromVerify, verifyEmailAgain, email, link }) => {

    return (
        <div className="verify-panel">
            <h1>{tr('login.needToVerifyText')}</h1>
            <Button
                color="primary"
                variant="contained"
                className="verify-again-button"
                onClick={() => verifyEmailAgain(email)}>{tr("login.sendLinkAgain")}</Button>
            <span className="verify-exit-link" onClick={exitFromVerify}>exit</span>
            <Link to={`${verifyLinkUrl}${link}`}>DEV LINK</Link>
        </div>
    );
}

const mapStateToProps = ({ login: { error: { link, email } } }) => {
    return {
        link,
        email
    }
}

export default compose(
    connect(mapStateToProps, { exitFromVerify, verifyEmailAgain }),
    withTranslate
)(VerifyPanel);