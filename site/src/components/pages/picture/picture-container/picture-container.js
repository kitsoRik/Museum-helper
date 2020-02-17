import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux'
import { Modal, AppBar, Tabs, Tab, Typography, Box } from '@material-ui/core';
import AddLanguageInfo from './add-language-info';

import { startLoadPictureInfo, untriggeredAddLanguageInfo } from '../../../../actions/picturesInfoActions';

import './picture-container.scss';
import PictureDevelopmentContainer from './picture-development-container';
import PictureProductionContainer from './picture-production-container/picture-production-container';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import qs from 'qs';

const PictureContainer = (props) => {

    const { picture } = props;
    
    const prod = qs.parse(props.location.search.slice(1)).v === "prod";
    return ( 
        <div className="picture-container">
            <AppBar position="static">
                <Tabs 
                    value={prod ? 1 : 0}
                    onChange={(e, v) => props.history.push(v === 1 ? '?v=prod' : '?v=dev')} 
                    variant="fullWidth">
                    <Tab label="Development" />
                    <Tab label="Prodaction" />
                </Tabs>
                </AppBar> 
                { !prod && <PictureDevelopmentContainer /> }    
                { prod && <PictureProductionContainer /> }
        </div>
     );
}

const mapStateToProps = (state) => {
    const { picture } = state.pictureInfo;
    return {
        picture
    }
}
 
export default compose(
    connect(mapStateToProps),
    withRouter
)
(PictureContainer);