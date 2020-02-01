import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import { getPictureData, apiHost } from '../../../services/api/api';

import "./picture.scss"
import PictureUpperPanel from './picture-upper-panel/picture-upper-panel';
import PictureInfoContainer from './picture-info-container';
import PictureIconContainer from './picture-icon-container/picture-icon-container';

const Picture = (props) => {
    const { match: { params: { id }}} = props;
    
    const [picture, setPicture] = useState(null);
    const [pictureInfo, setPictureInfo] = useState([]);

    useEffect(() => {
        getPictureData(id)
        .then((data) => {
            console.log(data);
            if(!data.success) {
                console.log("NOT SUCCESS");
                return;
            }
            setPicture(data.picture);
            setPictureInfo(data.pictureInfo);
        });
    }, [ ]);

    if(!picture) return <div>NOT FOUND</div>;

    return ( 
        <div className="picture-page">
            <PictureUpperPanel picture={picture} />
            <PictureIconContainer iconPath={`${apiHost}/static/pictureIcons/123.png`}/>
            <PictureInfoContainer picture={picture} pictureInfo={pictureInfo} />
        </div>
     );
}

const mapStateToProps = (state) => {
    console.log(state);
    return {

    }
}

const mapDipatchToProps = (dispatch, ownProps) => {
    return {

    }
}
 
export default withRouter(connect(mapStateToProps, mapDipatchToProps)(Picture));