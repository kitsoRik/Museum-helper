import React from 'react';
import { connect } from 'react-redux'
import { verifyLinkUrl } from '../../../../services/api/api';
import { Link } from 'react-router-dom';
import { tr } from '../../../../services/i18n/i18n';
import { compose } from 'redux';
import withTranslate from '../../../hocs/withTranslate';

const VerifyPanel = (props) => {
    const { link } = props;

    return ( 
        <div>
            { tr('login.needToVerifyText') }
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
 
export default compose(
    connect(mapStateToProps, mapDipatchToProps),
    withTranslate
)(VerifyPanel);