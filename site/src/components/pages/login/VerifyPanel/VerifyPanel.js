import React from 'react';
import { connect } from 'react-redux'
import { verifyLinkUrl } from '../../../../services/api/api';
import { Link } from 'react-router-dom';

const VerifyPanel = (props) => {
    const { link } = props;

    return ( 
        <div>
            Need to verify email, send vefiry link more?
            <Link to={`${verifyLinkUrl}${link}`}>Link</Link>
        </div>
     );
}

const mapStateToProps = ({ login: { error: { link }}}) => {
    return {
        link
    }
}

const mapDipatchToProps = (dispatch, ownProps) => {
    return {

    }
}
 
export default connect(mapStateToProps, mapDipatchToProps)(VerifyPanel);