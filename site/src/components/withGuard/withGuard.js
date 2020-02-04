import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

function withGuard(WrapperComponent)  {
    class HOC extends Component {

        render() {
            const { user: { loggedIn } } = this.props;
            console.log(this.props);
            if(loggedIn === "wait") return <span>WAIT</span>
            if(loggedIn !== true) return <Redirect to="/login"/> 

            return <WrapperComponent {...this.props}/>
        }
    }

    return connect(mapStateToProps, mapDipatchToProps)(HOC);
}

const mapStateToProps = ({ user }) => {
    return {
        user
    }
}

const mapDipatchToProps = (dispatch, ownProps) => {
    return {

    }
}



export default withGuard;