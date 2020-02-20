import React from 'react';
import { connect } from 'react-redux'

import './MuseumItem.scss';
import { Button, IconButton, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@material-ui/core';
import { museumsIconsBaseUrl } from '../../../../../../services/api/api';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';

const MuseumItem = (props) => {

    const { openReleaseDialog, openContextMenu } = props;
    const { museum: { id, name, iconName, location, updateId } } = props;
    return ( 
        <div 
            className="museum-item"
            onClick={() => props.history.push(`/museums/${id}`)}
            onContextMenu={(e) => {e.preventDefault(); openContextMenu(e.clientX, e.clientY)}}>
            <div className="museum-item-about">
                <h2 className="">
                    { name }
                </h2>
                <h3 className="">
                    { location }
                </h3>
            </div>
                {/* <h2>Release id: { updateId }</h2> */}

            <Button 
                variant="outlined" 
                onClick={(e) => {e.stopPropagation(); openReleaseDialog(id)}}>
                New release
            </Button>
            
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
 
export default compose(
    connect(mapStateToProps, mapDipatchToProps),
    withRouter
)(MuseumItem);