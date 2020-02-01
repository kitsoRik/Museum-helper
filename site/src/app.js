import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './components/pages/home/home';
import { getData } from './services/api/api';
import { connect } from 'react-redux';
import Login from './components/pages/login/login';
import { setDataCreator, failDataCreator } from './actions';
import Register from './components/pages/register/register';
import Pictures from './components/pages/pictures';
import Picture from './components/pages/picture';
import AddPicture from './components/pages/add-picture';

const App = (props) => {
    
    useEffect(() => {
        getData().then((data) => {
            if(data.success) {
                console.log(data);
                props.setData(data);
            } else {
                props.failData(data);
            }
        });
    }, [ ]);

    return ( 
        <Switch>
            <Route path="/" render={() => <Home /> } exact/>
            <Route path="/login" render={() => <Login /> } exact/>
            <Route path="/register" render={() => <Register /> } exact/>
            <Route path="/pictures/" render={() => <Pictures /> } exact/>
            <Route path="/addpicture" render={() => <AddPicture /> } exact/>
            <Route path="/pictures/:id" render={() => <Picture /> } exact/>
        </Switch>
     );
}

const mapStateToProps = () => {
    return {

    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setData: (data) => setDataCreator(data, dispatch),
        failData: (data) => failDataCreator(data, dispatch)
    }
}
 
export default connect(mapStateToProps, mapDispatchToProps)(App);