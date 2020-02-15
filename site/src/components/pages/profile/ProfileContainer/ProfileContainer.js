import React from 'react';
import { connect } from 'react-redux'
import { compose } from 'redux';
import ProfileMainDataContainer from './ProfileMainDataContainer/ProfileMainDataContainer';

import './ProfileContainer.scss';

const ProfileContainer = (props) => {
    return ( 
        <div className="profile-container">
            <ProfileMainDataContainer />
        </div>
     );
}

const mapStateToProps = ({ user: { name, email }}) => {
    return {

    }
}

const mapDipatchToProps = (dispatch, ownProps) => {
    return {

    }
}
 
export default compose(
    connect(mapStateToProps, mapDipatchToProps)
)(ProfileContainer);