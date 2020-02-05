import React, { useEffect } from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';

import "./picture.scss"
import PictureUpperPanel from './picture-upper-panel/picture-upper-panel';
import PictureInfoContainer from './picture-info-container';
import withDrawer from '../../withDrawer';
import { startLoadPictureInfoCreator, untriggeredAddLanguageInfoCreator } from '../../../actions/picturesInfoActions';
import { Modal, Divider, Snackbar } from '@material-ui/core';
import AddLanguageInfo from './add-language-info';
import { compose } from 'redux';
import { useSnackbar } from 'notistack';
import withAlert from '../../withAlert/withAlert';
import { alertAddNotificationCreator } from '../../../actions/alertActions';

const Picture = (props) => {
    const { match: { params: { id }}} = props;

    const { picture, triggeredAdd, untriggerAddLanguage } = props;
    const { startLoadPictureInfo, addAlert } = props;

    useEffect(() => {
        startLoadPictureInfo(id);
    }, [ ]);

    if(!picture) return <div>NOT FOUND</div>;
    
    return ( 
        <div className="picture-page">
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
            <PictureUpperPanel />
            <PictureInfoContainer />
            
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
        startLoadPictureInfo: (id) => dispatch(startLoadPictureInfoCreator(id, dispatch)),
        untriggerAddLanguage: () => dispatch(untriggeredAddLanguageInfoCreator()),
        
    }
}
 
export default compose(
    connect(mapStateToProps, mapDipatchToProps),
    withRouter,
    withDrawer,
    withAlert
)(Picture)