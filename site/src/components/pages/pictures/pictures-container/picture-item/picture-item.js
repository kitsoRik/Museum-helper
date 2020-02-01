import React, { useState } from 'react';
import { connect } from 'react-redux'

import "./picture-item.scss";
import { withRouter } from 'react-router-dom';
import PictureIconToolPanel from './picture-icon-tool-panel/picture-icon-tool-panel';
import { apiHost, deletePicture } from '../../../../../services/api/api';
import { deletePictureSuccessCreator } from '../../../../../actions'

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
        deletePicture: (id) => {
            deletePicture(id)
                .then((data) => {
                    console.log(data);
                    if(data.success) {
                        deletePictureSuccessCreator(id, dispatch);
                    }
                });
        }
    }
}
 
export default withRouter(connect(mapStateToProps, mapDipatchToProps)(PictureItem));