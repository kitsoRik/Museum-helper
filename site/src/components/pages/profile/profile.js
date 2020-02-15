import React from 'react';
import withGuard from '../../hocs/withGuard';
import { compose } from 'redux';
import { connect } from 'react-redux';
import ProfileContainer from './ProfileContainer';

import './Profile.scss';

const Profile = (props) => {
    return ( 
        <div className="profile-page">
            <ProfileContainer />
        </div>
     );
}
 
export default compose(
    connect(),
    withGuard
)(Profile);