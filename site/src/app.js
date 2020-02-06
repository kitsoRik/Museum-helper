import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './components/pages/home/home';
import { getData } from './services/api/api';
import { connect } from 'react-redux';
import Login from './components/pages/login/login';
import Register from './components/pages/register/register';
import Pictures from './components/pages/pictures';
import Picture from './components/pages/picture';
import AddPicture from './components/pages/add-picture';
import Documentation from './components/pages/documentation/documentation';
import NotFound from './components/pages/not-found/not-found';
import Drawer from './components/drawer';

import './app.scss';
import { getDataCreator } from './actions/userActions';
import { compose } from 'redux';
import withAlert from './components/withAlert/withAlert';
import withDrawer from './components/withDrawer';

const App = (props) => {
    
    useEffect(() => {
        props.getData();
    }, [ ]);

    return ( 
            <Switch>
                <Route path="/" render={() => <Home /> } exact/>
                <Route path="/login" render={() => <Login /> } exact/>
                <Route path="/register" render={() => <Register /> } exact/>
                <Route path="/pictures/" render={() => <Pictures /> } exact/>
                <Route path="/pictures/:id" render={() => <Picture /> } exact/>
                <Route path="/addpicture" render={() => <AddPicture /> } exact/>
                <Route path="/documentation" render={() => <Documentation /> } exact/>
                <Route render={() => <NotFound />} />
            </Switch>
     );
}

const mapStateToProps = () => {
    return {

    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getData: () => dispatch(getDataCreator(dispatch))
    }
}
 
export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withAlert,
    withDrawer
)(App);