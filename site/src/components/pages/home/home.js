import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import "./home.scss";
import { compose } from 'redux';
import { changeDrawerTitle } from '../../../actions/drawerActions';
import withFadeIn from '../../hocs/withFadeIn/withFadeIn';

const Home = (props) => {
    const { user: { loggedIn } } = props;
    
    const otherActionLink = loggedIn === true ? 
                        <Link to="/pictures">go to work</Link> : 
                        <Link to="/login">login</Link>;

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(changeDrawerTitle("Home"));
    }, [])
    
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

export default compose(
    connect(mapStateToProps),
    withFadeIn
)(Home);