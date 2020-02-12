import React from 'react';

import './picture-icon.scss';
import { ButtonGroup, Button } from '@material-ui/core';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { deleteIcon } from '../../../../../../../actions/picturesInfoActions';

const PictureIcon = (props) => {

    const { id, source } = props;
    const { deleteIcon } = props;

    return ( 
        <div 
            className="picture-icon">
            <img 
                src={ source }
                className="picture-icon-image" />

            <ButtonGroup
                variant="contained" 
                color="primary"
                style={{position: "absolute",zIndex: '1000', bottom: '10px'}}
            >
                <Button>Change</Button>
                <Button onClick={() => deleteIcon(id)}>Remove</Button>
            </ButtonGroup>
        </div>
     );
}
export default compose(
    connect(null, { deleteIcon })
)(PictureIcon);