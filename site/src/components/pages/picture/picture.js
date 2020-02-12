import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux'
import { withRouter } from 'react-router-dom';

import "./picture.scss"
import { loadPictureInfo, untriggeredAddLanguageInfo } from '../../../actions/picturesInfoActions';
import { CircularProgress } from '@material-ui/core';
import { compose } from 'redux';
import withAlert from '../../withAlert/withAlert';
import { changeDrawerTitle } from '../../../actions/drawerActions';
import PictureContainer from './picture-container/picture-container';
import withFadeIn from '../../hocs/withFadeIn/withFadeIn';

const Picture = (props) => {
    const { match: { params: { id }}} = props;
    const { picture } = props;
    const dispatch = useDispatch();
    const { loadPictureInfo } = props;

    useEffect(() => {
        loadPictureInfo(id);
    }, [ ]);

    useEffect(() => {
        if(!picture) return;
        dispatch(changeDrawerTitle(picture.name));
    }, [ picture ]);
    

    if(!picture) return <CircularProgress />;
    
    return ( 
        <div className="picture-page">
            <PictureContainer />
        </div>
     );
}

const mapStateToProps = (state) => {
    const { picture } = state.pictureInfo;
    return {
        picture
    }
}

export default compose(
    connect(mapStateToProps, { loadPictureInfo }),
    withRouter,
    withFadeIn
)(Picture)