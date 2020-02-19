import React from 'react';
import { connect } from 'react-redux'

const RegisterVerifyContainer = (props) => {
    const { verifyLink } = props;

    return ( 
        <div>
            You was registered, please vefiry your email!
            (DEV) => {verifyLink}
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
 
export default connect(mapStateToProps, mapDipatchToProps)(RegisterVerifyContainer);