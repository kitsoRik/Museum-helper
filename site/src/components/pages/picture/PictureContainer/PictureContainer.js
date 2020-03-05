import React from 'react';
import { AppBar, Tabs, Tab } from '@material-ui/core';


import './PictureContainer.scss';
import PictureDevelopmentContainer from './PictureDevelopmentContainer';
import PictureProductionContainer from './PictureProductionContainer';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import qs from 'qs';
import { tr } from '../../../../services/i18n/i18n';
import withTranslate from '../../../hocs/withTranslate';

const PictureContainer = (props) => {

    const prod = qs.parse(props.location.search.slice(1)).v === "prod";
    return ( 
        <div className="picture-container">
            <AppBar position="static">
                <Tabs 
                    value={prod ? 1 : 0}
                    onChange={(e, v) => props.history.push(v === 1 ? '?v=prod' : '?v=dev')} 
                    variant="fullWidth">
                    <Tab label={ tr('picture.development') } />
                    <Tab label={ tr('picture.production') } />
                </Tabs>
                </AppBar> 
                { !prod && <PictureDevelopmentContainer /> }    
                { prod && <PictureProductionContainer /> }
        </div>
     );
}
export default compose(
    withRouter,
    withTranslate
)
(PictureContainer);