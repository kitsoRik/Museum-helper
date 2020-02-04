import React, { useState } from 'react';
import { connect } from 'react-redux'

import "./picture-item.scss";
import { withRouter } from 'react-router-dom';
import PictureIconToolPanel from './picture-icon-tool-panel/picture-icon-tool-panel';
import { apiHost } from '../../../../../services/api/api';
import { deletePictureCreator } from '../../../../../actions/picturesActions'

const PictureItem = (props) => {

    const { id, iconPath } = props;

    const [hovered, setHovered] = useState(false);

    const onDelete = (e) => {
        e.stopPropagation();
        props.deletePicture(id);
    }
    
    return ( 
        <div 
            style={{backgroundImage: `url('${iconPath}')`}}
            className="picture-item"
            onClick={() => props.history.push(`/pictures/${id}`)}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <PictureIconToolPanel
                hovered={hovered}
                onDelete={onDelete}/>
        </div>
     );
}

const mapStateToProps = (state) => {
    return {
        
    }
}

const mapDipatchToProps = (dispatch, { iconName }) => {
    return {
        iconPath: `${apiHost}/static/pictureIcons/${iconName}`,
        deletePicture: (id) => dispatch(deletePictureCreator(id, dispatch))
    }
}
 
export default withRouter(connect(mapStateToProps, mapDipatchToProps)(PictureItem));