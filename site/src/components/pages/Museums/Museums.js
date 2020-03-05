import React, { useEffect } from 'react';
import { connect } from 'react-redux'
import { compose } from 'redux';
import withGuard from '../../hocs/withGuard';
import MuseumsContainer from './MuseumsContainer';

import './Museums.scss';
import withFadeIn from '../../hocs/withFadeIn';
import { changeDrawerTitle } from '../../../actions/drawer-actions';
import withTranslate from '../../hocs/withTranslate';
import { tr } from '../../../services/i18n/i18n';

const Museums = ({ language, changeDrawerTitle }) => {
    useEffect(() => {
        changeDrawerTitle(tr("museums.title"));
    }, [ language ])

    return ( 
        <div className="museums-page">
            <MuseumsContainer />
        </div>
     );
}

const mapStateToProps = ({ language }) => ({
    language
});

export default compose(
    connect(mapStateToProps, { changeDrawerTitle }),
    withGuard,
    withFadeIn,
    withTranslate
)(Museums);