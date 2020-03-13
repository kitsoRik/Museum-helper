import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux'
import { withRouter } from 'react-router-dom';

import "./Picture.scss"
import { loadPictureInfo } from '../../../actions/pictures-info-actions';
import { CircularProgress } from '@material-ui/core';
import { compose } from 'redux';
import { changeDrawerTitle } from '../../../actions/drawer-actions';
import PictureContainer from './PictureContainer';
import withFadeIn from '../../hocs/withFadeIn/withFadeIn';
import withGuard from '../../hocs/withGuard';

const Picture = (props) => {
    const { match: { params: { id }}} = props;
    const { picture } = props;
    const dispatch = useDispatch();
    const { loadPictureInfo } = props;

    useEffect(() => {
        loadPictureInfo(id);
    }, [ id ]);

    useEffect(() => {
        if(!picture) return;
        dispatch(changeDrawerTitle(picture.name));
    }, [ picture ]);
    

    if(!picture || picture.id != id) return <CircularProgress />;
    
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
    withFadeIn,
    withGuard
)(Picture)