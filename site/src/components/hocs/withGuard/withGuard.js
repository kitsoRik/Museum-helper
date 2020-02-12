import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

function withGuard(WrapperComponent)  {
    class HOC extends Component {
        render() {
            const { loggedIn } = this.props;
            if(loggedIn === "wait") return <span>WAIT</span>
            if(loggedIn !== true) return <Redirect to="/login"/> 

            return <WrapperComponent {...this.props}/>
        }
    }

    return connect(({ user: { loggedIn } }) => ({ loggedIn }))(HOC);
}

export default withGuard;