import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

function withGuard(WrapperComponent)  {
    class HOC extends Component {

        render() {
            const { userData: { loggedIn } } = this.props;
            if(loggedIn !== true) return <Redirect to="/login"/> 

            return <WrapperComponent {...this.props}/>
        }
    }

    return connect(mapStateToProps, mapDipatchToProps)(HOC);
}

const mapStateToProps = ({ userData }) => {
    return {
        userData
    }
}

const mapDipatchToProps = (dispatch, ownProps) => {
    return {

    }
}



export default withGuard;