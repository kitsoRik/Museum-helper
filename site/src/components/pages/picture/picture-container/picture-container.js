import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux'
import { Modal, AppBar, Tabs, Tab, Typography, Box } from '@material-ui/core';
import AddLanguageInfo from './add-language-info';

import { startLoadPictureInfoCreator, untriggeredAddLanguageInfoCreator } from '../../../../actions/picturesInfoActions';

import './picture-container.scss';
import PictureDevelopmentContainer from './picture-development-container';
import PictureProdactionContainer from './picture-info-container/picture-prodaction-container';

const PictureContainer = (props) => {

    const { picture, triggeredAdd, untriggerAddLanguage } = props;
    
    const [tabIndex, setTabIndex] = useState(0);
    
    return ( 
        <div className="picture-container">
            <AppBar position="static">
                <Tabs 
                    value={tabIndex}
                    onChange={(e, v) => setTabIndex(v)} 
                    variant="fullWidth">
                    <Tab label="Development"  />
                    <Tab label="Prodaction" />
                </Tabs>
                </AppBar> 
                { tabIndex === 0 && <PictureDevelopmentContainer /> }    
                { tabIndex === 1 && <PictureProdactionContainer /> }
            <Modal
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                }}
                open={triggeredAdd}
                onClose={() => untriggerAddLanguage()}
            >
                <AddLanguageInfo />
            </Modal>
        </div>
     );
}

const mapStateToProps = (state) => {
    const { picture, triggeredAdd } = state.pictureInfo;
    return {
        picture,
        triggeredAdd
    }
}

const mapDipatchToProps = (dispatch, ownProps) => {
    return {
        untriggerAddLanguage: () => dispatch(untriggeredAddLanguageInfoCreator()),
        

    }
}
 
export default connect(mapStateToProps, mapDipatchToProps)(PictureContainer);