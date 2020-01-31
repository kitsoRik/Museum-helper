import React, { useState } from 'react';
import { connect } from 'react-redux';

const LoginContainer = (props) => {

    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");

    const { onSubmit } = props;

    return (
        <div>
            <input 
                placeholder="Login..." 
                onChange={(e) => setLogin(e.target.value)}/>
            <input 
                placeholder="Password..."
                onChange={(e) => setPassword(e.target.value)}/>
            <button onClick={() => onSubmit(login, password)}>Login</button>
        </div>
    );
};

const mapStateToProps = () => {
    return {

    }
}

const mapDispatchToProps = (dispatch, { onLoginIn }) => {
    return {
        onSubmit: (login, password) => {
            onLoginIn(login, password);
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);
