import React from 'react';
import LoginContainer from './login-container/login-container';
import { startLoginIn, successLoginIn, errorLoginIn } from '../../../actions';
import { getLoginIn } from '../../../services/api/api';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import './login.scss';

const Login = (props) => {

    const { loginIn } = props;
    
    return ( 
        <div className="login-page">
            <LoginContainer onLoginIn={loginIn} />
        </div>
     );
}

const mapStateToProps = (state) => {
    return {

    }
}

const mapDipatchToProps = (dispatch, ownProps) => {
    return {
        loginIn: (email, password) => {
            startLoginIn(email, dispatch);
            getLoginIn(email, password)
                .then((data) => {
                    const { success } = data;
                    if(success) {
                        successLoginIn(data, dispatch);
                        ownProps.history.push("/");
                    } else {
                        const { error } = data;
                        errorLoginIn(error, dispatch);
                    }
                });
        }
    }
}
 
export default withRouter(connect(mapStateToProps, mapDipatchToProps)(Login));