import React from 'react';
const RegisterError = (props) => {

    const { observe, triggered } = props;

    if(!observe.error || !triggered) return null; 

    return ( 
        <span>{ observe.errorText }</span>
     );
}

export const email = (has = "") => {
    return {
        error: !/[A-Za-z0-9]+@[A-Za-z0-9]+\.[A-Za-z0-9]{1,3}/.test(has),
        errorText: "Need email"
    }
}

export const minLength = (has, need) => {
    return {
        error: has < need,
        errorText: `${need - has} more`
    }
}

export const equals = (first, second) => {
    return {
        error: first !== second,
        errorText: `Not equals`
    }
}

export default RegisterError;