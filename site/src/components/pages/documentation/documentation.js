import React, { useEffect } from 'react';
import { useDispatch, connect } from 'react-redux';
import { changeDrawerTitle } from '../../../actions/drawerActions';
import DocumentationContainer from './documentation-container/documentation-container';
import { compose } from 'redux';
import withFadeIn from '../../hocs/withFadeIn';
import { tr } from '../../../services/i18n/i18n';
import withTranslate from '../../hocs/withTranslate';

const Documentation = ({ language }) => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(changeDrawerTitle(tr('documentation.title')));
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
    connect(({ language }) => ({ language }))
)(Documentation);