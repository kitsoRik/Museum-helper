import React, { useState } from 'react';
import { connect } from 'react-redux';
import { getRegisterIn } from '../../../../services/api/api';
import { Redirect, withRouter } from 'react-router-dom';

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
        <div>
            <input 
                placeholder="Username..." 
                onChange={(e) => setUsername(e.target.value) }/>
            <input 
                placeholder="Email..." 
                onChange={(e) => setEmail(e.target.value) }/>
            <input 
                type="password"
                onChange={(e) => setPassword(e.target.value) }/>
            <input 
                type="password"
                onChange={(e) => setPasswordConfirm(e.target.value) }/>
            <button onClick={onSubmited}>Register</button>
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
                    const { history } = ownProps;
                    history.push("/login");
                }
            });
        }
    }
}
 
export default withRouter(
    connect(mapStateToProps, mapDipatchToProps)(RegisterContainer));