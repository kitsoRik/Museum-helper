import React from 'react';
import { connect } from 'react-redux';

import RegisterContainer from './register-container/register-container';

const Register = (props) => {
    return ( 
        <div>
            <RegisterContainer />
        </div>
     );
}

const mapStateToProps = (state) => {
    return {

    }
}

const mapDipatchToProps = (dispatch, ownProps) => {
    return {

    }
}
 
export default connect(mapStateToProps, mapDipatchToProps)(Register);