import React, { useState } from 'react';
import { connect } from 'react-redux';
import { getRegisterIn } from '../../../../services/api/api';
import { withRouter, Link } from 'react-router-dom';

import './register-container.scss';
import RegisterError, { minLength, email as ObsEmail, equals } from './register-error/register-error';

const RegisterContainer = (props) => {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");

    const { onSubmit } = props;

    const onSubmited = () => {
        const data = {
            username,
            email,
            password,
            passwordConfirm
        }

        onSubmit(data);
    }

    return ( 
        <div className="register-container">
            <h1 className="register-title">Register</h1>
            <h4 className="register-container-label"
                >Username</h4>
            <input 
                placeholder="Username..." 
                onChange={(e) => setUsername(e.target.value) }/>
            <RegisterError 
                triggered={username.length !== 0}
                observe={minLength(username.length, 8)} />
            <h4 className="register-container-label"
                >Email</h4>
            <input 
                placeholder="Email..." 
                onChange={(e) => setEmail(e.target.value) }/>
            <RegisterError 
                triggered={email.length !== 0}
                observe={ObsEmail(email)} />
            <h4 className="register-container-label"
                >Password</h4>
            <input 
                type="password"
                onChange={(e) => setPassword(e.target.value) }/>
            <RegisterError 
                triggered={password.length !== 0}
                observe={minLength(password.length, 8)} />
            <h4 className="register-container-label"
                >Password confirm</h4>
            <input 
                type="password"
                onChange={(e) => setPasswordConfirm(e.target.value) }/>
            <RegisterError 
                triggered={passwordConfirm.length !== 0}
                observe={equals(password, passwordConfirm)} />
            <button
                className="register-submit-btn" 
                onClick={onSubmited}
            >Register</button>
            <Link
                className="register-login-link" 
                to="/login"
            >Login in</Link>
        </div>
     );
}

const mapStateToProps = (state) => {
    return {

    }
}

const mapDipatchToProps = (dispatch, ownProps) => {
    return {
        onSubmit: (d) => {
            getRegisterIn(d).then((data) => {
                if(data.success) {
                    ownProps.history.push("/login");
                }
            });
        }
    }
}
 
export default withRouter(
    connect(mapStateToProps, mapDipatchToProps)(RegisterContainer));