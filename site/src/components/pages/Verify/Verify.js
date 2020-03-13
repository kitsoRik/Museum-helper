import React, { useEffect } from 'react';
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom';
import { compose } from 'redux';

import './Verify.scss';
import { CircularProgress } from '@material-ui/core';
import { verifyEmail } from '../../../actions/verify-actions';
import { IS_VERIFYING, VERIFIED } from '../../../constants';
import { tr } from '../../../services/i18n/i18n';
import withTranslate from '../../hocs/withTranslate';

const Verify = (props) => {
    const { match: { params: { link }}} = props;

    const { email, verifying, error } = props;
    const { verifyEmail } = props;

    useEffect(() => {
        verifyEmail(link);
    }, [ ]);

    if(error) {
        const { type } = error;
        if(type === "UNKNOWN_LINK") return (
            <div className="verify-page">
                { tr("verify.unknownLink") }
            </div>
        )
        
    }

    return ( 
        <div className="verify-page">
            <div className="verify-container">
                { verifying === VERIFIED && <h2 className="verify-email">
                { tr("verify.emailHasBeenVerified", { email }) }
                </h2> }
                { verifying === VERIFIED && <Link to="/login">{ tr("verify.toLogin") }</Link>}
    { verifying === IS_VERIFYING && <CircularProgress style={{width: "128px", height: "128px"}} /> }
            </div>
        </div>
     );
}

const mapStateToProps = ({ verify: { email, verifying, error }}) => {
    return {
        email,
        verifying,
        error
    }
}
 
export default compose(
    connect(mapStateToProps, { verifyEmail }),
    withRouter,
    withTranslate
)(Verify);