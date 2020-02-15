import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './components/pages/home/';
import { connect } from 'react-redux';
import Login from './components/pages/login/login';
import Register from './components/pages/register/register';
import Pictures from './components/pages/pictures';
import Picture from './components/pages/picture';
import Documentation from './components/pages/documentation/documentation';
import NotFound from './components/pages/not-found/not-found';

import './app.scss';
import { getData } from './actions/userActions';
import { compose } from 'redux';
import withAlert from './components/withAlert/withAlert';
import Favorites from './components/pages/favotires/favorites';
import withFadeIn from './components/hocs/withFadeIn/withFadeIn';
import MainDrawer from './components/MainDrawer';
import Profile from './components/pages/Profile';
import Museums from './components/pages/Museums';

const App = (props) => {
    
    useEffect(() => {
        props.getData();
    }, [ ]);

    return ( 
        <MainDrawer>
            <Switch>
                <Route path="/" render={() => <Home /> } exact/>
                <Route path="/login" render={() => <Login /> } exact/>
                <Route path="/register" render={() => <Register /> } exact/>
                <Route path="/profile" render={() => <Profile /> } exact/>
                <Route path="/museums" render={() => <Museums /> } exact/>
                <Route path="/pictures/" render={() => <Pictures /> } exact/>
                <Route path="/pictures/:id" render={() => <Picture /> } exact/>
                <Route path="/favorites" render={() => <Favorites /> } exact/>
                <Route path="/documentation" render={() => <Documentation /> } exact/>
                <Route render={() => <NotFound />} />
            </Switch>
        </MainDrawer>
     );
}

const mapStateToProps = () => {
    return {

    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getData: () => dispatch(getData())
    }
}
 
export default compose(
    withFadeIn,
    connect(mapStateToProps, mapDispatchToProps),
    withAlert,
)(App);