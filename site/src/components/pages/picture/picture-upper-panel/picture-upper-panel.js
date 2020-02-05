import React from 'react';

import './picture-upper-panel.scss';
import PictureIconContainer from './picture-icon-container';
import { apiHost } from '../../../../services/api/api';
import PictureUpperPanelDataItem from './picture-upper-panel-data-item/picture-upper-panel-data-item';
import { connect } from 'react-redux';
import PictureLanguages from '../picture-info-container/picture-languages/picture-languages';

const PictureUpperPanel = (props) => {

    const { picture } = props;
    
    
    return ( 
        <div className="picture-upper-panel">
            <PictureIconContainer
            iconPath={`${apiHost}/static/pictureIcons/${picture.iconName}`} />
            <div className="picture-upper-panel-info">
                <PictureUpperPanelDataItem label={"Name"}
                    label="Name"
                    option="name"/>
                <PictureUpperPanelDataItem label={"Description"}
                    label="Description"
                    option="description"/>
                <PictureUpperPanelDataItem 
                    label="QR code"
                    option="qrcode"/>
                <PictureLanguages />
            </div>
            <img 
                className="picture-qrcode-icon" 
                src={`https://api.qrserver.com/v1/create-qr-code/?data=${picture.qrcode}`} 
                alt="QRCODE"/>
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

    }
}

export default connect(mapStateToProps, mapDipatchToProps)(PictureUpperPanel);