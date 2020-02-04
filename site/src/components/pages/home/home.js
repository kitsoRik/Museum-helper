import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import "./home.scss";
import withDrawer from '../../withDrawer/';

const Home = (props) => {
    const { user: { loggedIn } } = props;
    
    const otherActionLink = loggedIn === true ? 
                        <Link to="/pictures">go to work</Link> : 
                        <Link to="/login">login</Link>;
    
    return ( 
        <div className="home-page">
            <div className="home-page-main-action-container">
                <Link 
                    className="get-started-btn"
                    to="/documentation"
                >Get stated</Link>
            </div>
            <span className="home-page-other-action-container">
                or { otherActionLink }
            </span>
        </div>
     );
}

const mapStateToProps = ({ user }) => {
    return {
        user
    }
}

const mapDipatchToProps = (dispatch, props) => {
    return {
    }
}

export default connect(mapStateToProps, mapDipatchToProps)((Home));