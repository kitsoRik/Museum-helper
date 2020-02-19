import React from 'react';
import { connect } from 'react-redux';

import RegisterContainer from './register-container/register-container';

import './register.scss';
import { compose } from 'redux';
import withFadeIn from '../../hocs/withFadeIn/withFadeIn';
import RegisterVerifyContainer from './RegisterVerifyContainer';

const Register = (props) => {

    const { registered } = props;

    return ( 
        <div className="register-page">
            { !registered && <RegisterContainer /> }
            { registered && <RegisterVerifyContainer /> }
        </div>
     );
}
export default compose(
    connect((
            { register: { registered }}) => ({ registered })
        ),
    withFadeIn
)(Register)