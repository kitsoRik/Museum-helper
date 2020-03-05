import React, { useEffect } from 'react';
import withGuard from '../../hocs/withGuard';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { changeDrawerTitle } from '../../../actions/drawer-actions';
import ProfileContainer from './ProfileContainer';

import './Profile.scss';
import { tr } from '../../../services/i18n/i18n';
import withTranslate from '../../hocs/withTranslate';
import withFadeIn from '../../hocs/withFadeIn';

const Profile = ({ language, changeDrawerTitle }) => {
    useEffect(() => {
        changeDrawerTitle(tr('profile.title'));
    }, [ language ]);
    
    return ( 
        <div className="profile-page">
            <ProfileContainer />
        </div>
     );
}
 
export default compose(
    connect(({ language }) => ({ language }), { changeDrawerTitle }),
    withGuard,
    withTranslate,
    withFadeIn
)(Profile);