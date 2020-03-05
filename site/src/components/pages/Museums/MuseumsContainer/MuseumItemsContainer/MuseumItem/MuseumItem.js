import React from 'react';

import './MuseumItem.scss';
import { Button } from '@material-ui/core';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { tr } from '../../../../../../services/i18n/i18n';
import withTranslate from '../../../../../hocs/withTranslate';

const MuseumItem = (props) => {

    const { openReleaseDialog, openContextMenu } = props;
    const { museum: { id, name, location } } = props;
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
                { tr('museums.museumItem.newRelease') }
            </Button>
            
        </div>
     );
}

export default compose(
    withRouter,
    withTranslate
)(MuseumItem);