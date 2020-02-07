import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux'
import { withRouter } from 'react-router-dom';

import "./picture.scss"
import { startLoadPictureInfoCreator, untriggeredAddLanguageInfoCreator } from '../../../actions/picturesInfoActions';
import { CircularProgress } from '@material-ui/core';
import { compose } from 'redux';
import withAlert from '../../withAlert/withAlert';
import { changeDrawerTitleCreator } from '../../../actions/drawerActions';
import PictureContainer from './picture-container/picture-container';

const Picture = (props) => {
    const { match: { params: { id }}} = props;
    const { picture } = props;
    const dispatch = useDispatch();
    const { startLoadPictureInfo } = props;

    useEffect(() => {
        startLoadPictureInfo(id);
    }, [ ]);

    useEffect(() => {
        if(!picture) return;
        dispatch(changeDrawerTitleCreator(picture.name));
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

const mapDipatchToProps = (dispatch, ownProps) => {
    return {
        startLoadPictureInfo: (id) => dispatch(startLoadPictureInfoCreator(id, dispatch)),

    }
}
 
export default compose(
    connect(mapStateToProps, mapDipatchToProps),
    withRouter,
    withAlert
)(Picture)