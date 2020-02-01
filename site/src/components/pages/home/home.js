import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import "./home.scss";

const Home = (props) => {
    const { userData: { loggedIn } } = props;
    
    if(!loggedIn) {
        return <Redirect to="/login"/>
    } else if(loggedIn === "wait") {
        return <span>Wait...</span>
    }
    
    return ( 
        <div className="home-page">
            <button className="get-started-btn">Get stated</button>
        </div>
     );
}

const mapStateToProps = ({ userData }) => {
    return {
        userData
    }
}

const mapDipatchToProps = (dispatch, props) => {
    return {
    }
}

export default connect(mapStateToProps, mapDipatchToProps)(Home);