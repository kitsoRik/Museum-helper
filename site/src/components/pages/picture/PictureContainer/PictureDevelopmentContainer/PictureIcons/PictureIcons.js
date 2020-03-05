import React from 'react';

import './PictureIcons.scss';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { IconButton } from '@material-ui/core';
import AddAPhotoRoundedIcon from '@material-ui/icons/AddAPhotoRounded';
import { addIcon } from '../../../../../../actions/pictures-info-actions';
import PictureIconsContainer from './PictureIconsContainer';
import withTranslate from '../../../../../hocs/withTranslate';
import { tr } from '../../../../../../services/i18n/i18n';

const PictureIcons = (props) => {
    const { picture } = props;
    const { addIcon } = props;

    return ( 
        <div 
            className="picture-icons"
        >
            <div className="picture-icons-header">   
                <h2>{ tr('picture.icons') }</h2>
                <IconButton
                        onClick={(e) => {
                            let input = document.createElement('input');
                            input.type = "file";
                            input.click();

                            input.onchange = (e) => {
                                if(input.files.length === 0)
                                    return;
                                addIcon(picture.id, input.files[0]);
                            }
                        }}>
                    <AddAPhotoRoundedIcon 
                        color="primary"/>
                </IconButton>
            </div>
            <PictureIconsContainer />
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
    connect(mapStateToProps, { addIcon }),
    withTranslate
)(PictureIcons);