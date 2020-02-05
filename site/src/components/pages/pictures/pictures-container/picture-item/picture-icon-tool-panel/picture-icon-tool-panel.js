import React from 'react';

import './picture-icon-tool-panel.scss';

import DeleteIcon from '@material-ui/icons/Delete';

const PictureIconToolPanel = (props) => {

    const { hovered } = props;
    const { onDelete } = props;

    return (
        <DeleteIcon
            color="primary"
            onClick={onDelete}/>
    );
}

export default PictureIconToolPanel;