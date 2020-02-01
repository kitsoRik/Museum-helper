import React from 'react';
const LoginError = ({ error }) => {
    if(!error) return null;

    return ( 
        <span>ERROR</span>
     );
}

export default LoginError;