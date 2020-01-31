import React from 'react';
import { connect } from 'react-redux';
import { triggerTestAction } from '../../../actions';
import { Redirect } from 'react-router-dom';


const Home = (props) => {
    const { userData: { loggedIn } } = props;
    console.log(loggedIn);
    if(!loggedIn) {
        return <Redirect to="/login"/>
    } else if(loggedIn === "wait") {
        return <span>Wait...</span>
    }
    
    return ( 
        <div>
            Hello { props.userData.username }
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