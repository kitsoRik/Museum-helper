import React from 'react';
import { connect } from 'react-redux'

import "./picture-item.scss";

const PictureItem = (props) => {

    const { iconPath } = props;

    return ( 
        <div className="picture-item">
            Picture
            <img src={ iconPath }/>
        </div>
     );
}

const mapStateToProps = (state) => {
    return {
        
    }
}

const mapDipatchToProps = (dispatch, { iconName }) => {
    return {
        iconPath: `http://localhost:3005/static/pictureIcons/${iconName}`
    }
}
 
export default connect(mapStateToProps, mapDipatchToProps)(PictureItem);