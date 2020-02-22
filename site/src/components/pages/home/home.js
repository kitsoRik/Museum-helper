import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import "./home.scss";
import { compose } from 'redux';
import { changeDrawerTitle } from '../../../actions/drawerActions';
import withFadeIn from '../../hocs/withFadeIn/withFadeIn';
import { tr } from '../../../services/i18n/i18n';
import withTranslate from '../../hocs/withTranslate';

const Home = (props) => {
    const { language, user: { loggedIn } } = props;
    
    const otherActionLink = loggedIn === true ? 
                        <Link to="/pictures">{ tr('home.goToWork') }</Link> : 
                        <Link to="/login">{ tr('home.login') }</Link>;

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(changeDrawerTitle(tr('home.title')));
    }, [ language ])
    
    return ( 
        <div className="home-page">
            <div className="home-page-main-action-container">
                <Link 
                    className="get-started-btn"
                    to="/documentation"
                >{ tr('home.getStarted') }</Link>
            </div>
            <span className="home-page-other-action-container">
                { tr('home.or') } { otherActionLink }
            </span>
        </div>
     );
}

const mapStateToProps = ({ user, language }) => {
    return {
        user
    }
}

export default compose(
    connect(mapStateToProps),
    withFadeIn,
    withTranslate
)(Home);