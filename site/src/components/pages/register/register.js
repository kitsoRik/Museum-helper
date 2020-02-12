import React from 'react';
import { connect } from 'react-redux';

import RegisterContainer from './register-container/register-container';

import './register.scss';
import { compose } from 'redux';
import withFadeIn from '../../hocs/withFadeIn/withFadeIn';

const Register = (props) => {
    return ( 
        <div className="register-page">
            <RegisterContainer />
        </div>
     );
}
 
export default compose(
    withFadeIn
)(Register)