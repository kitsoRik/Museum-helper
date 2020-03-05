import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { changeDrawerTitle } from '../../../actions/drawer-actions';
import DocumentationContainer from './DocumentationContainer';
import { compose } from 'redux';
import withFadeIn from '../../hocs/withFadeIn';
import { tr } from '../../../services/i18n/i18n';
import withTranslate from '../../hocs/withTranslate';

const Documentation = ({ language, changeDrawerTitle}) => {


    useEffect(() => {
        changeDrawerTitle(tr('documentation.title'));
    }, [ language ])

    return ( 
        <div style={{height: '100%', overflow: "auto"}}>
            <DocumentationContainer />
        </div>
     );
}

export default compose(
    withFadeIn,
    withTranslate,
    connect(({ language }) => ({ language, changeDrawerTitle }))
)(Documentation);