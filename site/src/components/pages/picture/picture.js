import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import { getPictureData, apiHost, addLanguageInfo, savePictureData, savePictureInfo } from '../../../services/api/api';

import "./picture.scss"
import PictureUpperPanel from './picture-upper-panel/picture-upper-panel';
import PictureInfoContainer from './picture-info-container';
import PictureIconContainer from './picture-icon-container/picture-icon-container';

const Picture = (props) => {
    const { match: { params: { id }}} = props;
    
    const [loaded, setLoaded] = useState(false);
    const [picture, setPicture] = useState(null);
    const [pictureInfo, setPictureInfo] = useState([]);

    const onLanguageAdded = (language) => {
        if(!language) return;
        addLanguageInfo(picture.id, language)
            .then((data) => {
                setPictureInfo(
                    pictureInfo.concat(
                        data.addedPictureInfo)
                )
            });
    }

    const onQrcodeChanged = (qrcode) => {
        savePictureData(picture.id, { qrcode })
            .then((data) => {
                if(data.success) {
                    
                }
            });
    }

    const onPictureInfoChanged = (index, changedData) => {
        savePictureInfo(
            pictureInfo[index].id, {
                description: changedData
            }).then((data) => {
                if(data.success) {
                    pictureInfo[index].description = data.result.description;
                }
            });
    }

    useEffect(() => {
        getPictureData(id)
        .then((data) => {
            if(!data.success) {
                console.log("NOT SUCCESS");
                return;
            }
            setPicture(data.picture);
            setPictureInfo(data.pictureInfo);
            setLoaded(true);
        });
    }, [ ]);

    if(!picture) return <div>NOT FOUND</div>;

    return ( 
        <div className="picture-page">
            <PictureUpperPanel 
                picture={picture} 
                onQrcodeChanged={onQrcodeChanged}/>
            <PictureIconContainer 
                iconPath={`${apiHost}/static/pictureIcons/${picture.iconName}`}/>
            <PictureInfoContainer 
                loaded={loaded} 
                picture={picture} 
                pictureInfo={pictureInfo}
                onLanguageAdded={onLanguageAdded}
                onPictureInfoChanged={onPictureInfoChanged} />
        </div>
     );
}

const mapStateToProps = (state) => {
    return {

    }
}

const mapDipatchToProps = (dispatch, ownProps) => {
    return {

    }
}
 
export default withRouter(connect(mapStateToProps, mapDipatchToProps)(Picture));