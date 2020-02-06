import React, { useEffect, useState } from 'react';

import './picture-upper-panel.scss';
import PictureIconContainer from './picture-icon-container';
import { apiHost } from '../../../../services/api/api';
import PictureUpperPanelDataItem from './picture-upper-panel-data-item/picture-upper-panel-data-item';
import { connect } from 'react-redux';
import PictureLanguages from '../picture-info-container/picture-languages/picture-languages';
import { InputAdornment, TextField, FormControl, ListItemSecondaryAction, IconButton, Tooltip } from '@material-ui/core';
import { AccountCircle, Delete, GetApp } from '@material-ui/icons';
import { changePictureCreator } from '../../../../actions/picturesInfoActions';
import { debounce } from 'debounce';

const PictureUpperPanel = (props) => {

    const { currentIndex, picture } = props;
    const { onPictureChanged } = props;

    const [qrcode, setQrcode] = useState(picture.qrcode);
    console.log(picture);
    useEffect(() => {
        onPictureChanged(picture.id, { qrcode });
    }, [ qrcode ])

    return ( 
        <div className="picture-upper-panel">
            <PictureIconContainer
            iconPath={`${apiHost}/static/pictureIcons/${picture.iconName}`} />
            <div className="picture-upper-panel-info">
                <PictureUpperPanelDataItem label={"Name"}
                    label="Name"
                    option="name"/>
                <PictureUpperPanelDataItem label={"Description"}
                    label="Description"
                    option="description"/>
                    <FormControl>
                        <TextField
                            label={"qrcode"}
                            value={qrcode}
                            defaultValue=" "
                            variant="outlined"
                            color="primary"
                            style={{marginTop: "8px"}}
                            onChange={(e) => setQrcode(e.target.value)}
                            InputProps={{
                                startAdornment: (
                                <InputAdornment position="start">
                                    <AccountCircle />
                                </InputAdornment>
                                ),
                            }} />
                            <ListItemSecondaryAction>
                                <IconButton onClick={() => {
                                    console.log("A");
                                    const link = document.createElement('a');
                                    link.download = "123.png";
                                    document.body.appendChild(link);
                                    link.href = `https://api.qrserver.com/v1/create-qr-code/?data=${qrcode}`;
                                    link.click();
                                }}>
                                    <Tooltip title="Generate" enterDelay={500} leaveDelay={200}>
                                        <GetApp />
                                    </Tooltip>
                                </IconButton>
                            </ListItemSecondaryAction>
                    </FormControl>
                <PictureLanguages />
            </div>
        </div>
     );
}



const mapStateToProps = (state) => {
    const { currentIndex, picture } = state.pictureInfo;
    
    return {
        picture,
        currentIndex
    }
}

const mapDipatchToProps = (dispatch, ownProps) => {
    return {
        onPictureChanged: debounce(
            (id, changes) => 
            dispatch(changePictureCreator(id, changes))
            , 1000)
    }
}

export default connect(mapStateToProps, mapDipatchToProps)(PictureUpperPanel);