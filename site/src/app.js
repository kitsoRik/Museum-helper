import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './components/pages/Home/';
import { connect } from 'react-redux';
import Login from './components/pages/Login';
import Register from './components/pages/Register';
import Pictures from './components/pages/Pictures';
import Picture from './components/pages/Picture';
import Documentation from './components/pages/Documentation';
import NotFound from './components/pages/NotFound';

import './app.scss';
import { getData } from './actions/user-actions';
import { compose } from 'redux';
import Favorites from './components/pages/Favorites/Favorites';
import withFadeIn from './components/hocs/withFadeIn/withFadeIn';
import MainDrawer from './components/MainDrawer';
import Profile from './components/pages/Profile';
import Museums from './components/pages/Museums';
import { loadMuseums } from './actions/museums-actions';
import Museum from './components/pages/Museum';
import Verify from './components/pages/Verify';
import { LOADED } from './constants';

const App = ({ dataLoading, getData, loadMuseums, has, typeModal }) => {
    
    useEffect(() => {
        getData();
        loadMuseums();
    }, [ ]);

    if(has) {
        if(typeModal === "ERROR")
            return (<div className="modal">
                <span>Network error</span>
            </div>);
    }

    if(dataLoading !== LOADED) return <span>WAIT</span>

    return ( 
        <MainDrawer>
            <Switch>
                <Route path="/" render={() => <Home /> } exact/>
                <Route path="/login" render={() => <Login /> } exact/>
                <Route path="/register" render={() => <Register /> } exact/>
                <Route path="/verifyEmail/:link" render={() => <Verify /> } exact/>
                <Route path="/profile" render={() => <Profile /> } exact/>
                <Route path="/museums" render={() => <Museums /> } exact/>
                <Route path="/museums/:id" render={() => <Museum /> } exact/>
                <Route path="/pictures/" render={() => <Pictures /> } exact/>
                <Route path="/pictures/:id" render={() => <Picture /> } exact/>
                <Route path="/favorites" render={() => <Favorites /> } exact/>
                <Route path="/documentation" render={() => <Documentation /> } exact/>
                <Route render={() => <NotFound />} />
            </Switch>
        </MainDrawer>
     );
}

const mapStateToProps = ({ language, user: { loading }, modal: { has, typeModal }}) => 
    ({ language, dataLoading: loading, has, typeModal })
 
export default compose(
    withFadeIn,
    connect(mapStateToProps, { getData, loadMuseums })
)(App);