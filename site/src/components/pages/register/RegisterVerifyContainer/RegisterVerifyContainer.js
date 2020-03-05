import React from 'react';
import { connect } from 'react-redux'
import { tr } from '../../../../services/i18n/i18n';
import { compose } from 'redux';
import withTranslate from '../../../hocs/withTranslate';
import { Link } from '@material-ui/core';
import { verifyLinkUrl } from '../../../../services/api/api';

const RegisterVerifyContainer = (props) => {
    const { verifyLink } = props;

    return ( 
        <div>
            { tr('register.verifyText') }
            <Link href={`${verifyLinkUrl}${verifyLink}`}>DEV LINK</Link>
        </div>
     );
}

const mapStateToProps = ({ register: { verifyLink }}) => {
    return {
        verifyLink
    }
}

const mapDipatchToProps = (dispatch, ownProps) => {
    return {

    }
}
 
export default compose(
    connect(mapStateToProps, mapDipatchToProps),
    withTranslate
)(RegisterVerifyContainer);