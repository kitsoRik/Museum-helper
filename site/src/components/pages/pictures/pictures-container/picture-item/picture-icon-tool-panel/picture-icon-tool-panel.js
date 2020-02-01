import React from 'react';

import './picture-icon-tool-panel.scss';

const PictureIconToolPanel = (props) => {

    const { hovered } = props;
    const { onDelete } = props;

    return (
        <div
            hovered={hovered.toString()}
            className="picture-icon-tool-item"
            onClick={onDelete}>
            D
        </div>
    );
}

export default PictureIconToolPanel;