import React, { useEffect } from 'react';
import { connect } from 'react-redux'
import PicturesContainer from './pictures-container';
import { startLoadPicturesCreator, loadPicturesSuccesssCreator, loadPicturesErrorCreator } from '../../../actions';
import { getPicturesData } from '../../../services/api/api';

import "./pictures.scss";
import withGuard from '../../withGuard/withGuard';
import withDrawer from '../../withDrawer';

const Pictures = (props) => {

    const { beginLoadPictures,
            successLoadPictures,
            errorLoadPictures } = props;

    useEffect(() => {
        beginLoadPictures();
        getPicturesData().then((data) => {
            if(data.success) {
                successLoadPictures(data.pictures);
            } else {
                errorLoadPictures(data.error);
            }
        });
    }, [ ])

    return ( 
        <div className="pictures-page">
            <h1>Pictures</h1>
            <PicturesContainer />
        </div>
     );
}

const mapStateToProps = (state) => {
    return {

    }
}

const mapDipatchToProps = (dispatch, ownProps) => {
    return {
        beginLoadPictures: () => startLoadPicturesCreator(dispatch),
        successLoadPictures: (data) => loadPicturesSuccesssCreator(data, dispatch),
        errorLoadPictures: (error) => loadPicturesErrorCreator(error, dispatch)
    }
}
 
export default connect(mapStateToProps, mapDipatchToProps)((withGuard(Pictures)));