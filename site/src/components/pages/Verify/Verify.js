import React, { useEffect } from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';

import './Verify.scss';
import { CircularProgress, Fab } from '@material-ui/core';
import { verifyEmail } from '../../../actions/verifyActions';
import { IS_VERIFYING, VERIFIED } from '../../../constants';

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
                Unknown verify link
            </div>
        )
        
    }

    return ( 
        <div className="verify-page">
            <div className="verify-container">
                { verifying === VERIFIED && <h2 className="verify-email">
                    Email: { email } has been verified
                </h2> }
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
    withRouter
)(Verify);