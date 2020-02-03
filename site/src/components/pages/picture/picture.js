import React, { useEffect } from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import { getPictureData, addLanguageInfo, savePictureData, savePictureInfo } from '../../../services/api/api';

import "./picture.scss"
import PictureUpperPanel from './picture-upper-panel/picture-upper-panel';
import PictureInfoContainer from './picture-info-container';
import withDrawer from '../../withDrawer';
import { startLoadPictureInfoCreator, loadPictureInfoSuccessCreator } from '../../../actions';

const Picture = (props) => {
    const { match: { params: { id }}} = props;

    const { picture, pictureInfo } = props;
    const { startLoadPictureInfo } = props;

    useEffect(() => {
        startLoadPictureInfo(id);
    }, [ ]);

    if(!picture) return <div>NOT FOUND</div>;

    return ( 
        <div className="picture-page">
            <PictureUpperPanel />
            <PictureInfoContainer />
        </div>
     );
}

const mapStateToProps = (state) => {
    
    const { picture, pictureInfo } = state.pictureInfoData;
    return {
        picture,
        pictureInfo
    }
}

const mapDipatchToProps = (dispatch, ownProps) => {
    return {
        startLoadPictureInfo: (id) => {
            startLoadPictureInfoCreator(id, dispatch);
            getPictureData(id)
                .then((data) => {
                    if(!data.success) {
                        console.log("NOT SUCCESS");
                        return;
                    }
                    loadPictureInfoSuccessCreator(
                        data.picture, 
                        data.pictureInfo, 
                        dispatch);
                });
        }
    }
}
 
export default withRouter(connect(mapStateToProps, mapDipatchToProps)(withDrawer(Picture)));