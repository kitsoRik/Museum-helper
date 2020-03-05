import React, { useState } from 'react';

import './PictureDevelopmentContainer.scss';
import PictureIcons from './PictureIcons';
import { connect } from 'react-redux';
import { InputAdornment, TextField, FormControl, ListItemSecondaryAction, IconButton, Tooltip, Switch, FormControlLabel } from '@material-ui/core';
import { AccountCircle, GetApp } from '@material-ui/icons';
import { changePicture } from '../../../../../actions/pictures-info-actions';
import CropFreeIcon from '@material-ui/icons/CropFree';
import { tr } from '../../../../../services/i18n/i18n';
import { compose } from 'redux';
import withTranslate from '../../../../hocs/withTranslate';

const PictureDevelopmentContainer = (props) => {

    const { picture } = props;
    const { id } = picture;
    const { changePicture } = props;

    const [name, setName] = useState(picture.name);
    const [description, setDescription] = useState(picture.description);
    const [qrcode, setQrcode] = useState(picture.qrcode);
    const [includeRelease, setIncludeRelease] = useState(picture.includeRelease);

    return (
        <div className="picture-development-container">
            <div className="picture-upper-panel-info">

                <NameComponent 
                        name={name}
                        setName={setName}
                        save={() => changePicture(id, { name })}/>
                <DescriptionComponent 
                        description={description}
                        setDescription={setDescription}
                        save={() => changePicture(id, { description })}/>
                <QrcodeComponent 
                        qrcode={qrcode}
                        setQrcode={setQrcode}
                        save={() => changePicture(id, { qrcode })}/>  
                <FormControlLabel
                    style={{flexDirection: "row", margin: '0'}}
                    control={
                        <Switch 
                            color="primary"   
                            checked={ includeRelease === 1 } 
                            onChange={e => {
                                const v = e.target.checked ? 1 : 0;
                                setIncludeRelease(v);
                                
                                changePicture(id, { includeRelease: v });
                            }} />}
                    label={ tr('picture.includeNextRelease') }
                    labelPlacement="start"
                />
            </div>
            <PictureIcons />
        </div>
    );
}

const QrcodeComponent = (props) => {

    const { qrcode, setQrcode, save } = props;

    return (
        <FormControl>
            <TextField
                label={ tr('constants.qrcode') }
                value={qrcode}
                variant="outlined"
                color="primary"
                style={{ marginTop: "8px" }}
                onChange={(e) => setQrcode(e.target.value)}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <CropFreeIcon />
                        </InputAdornment>
                    ),
                }} 
                onBlur={save}/>
            <ListItemSecondaryAction>
                <IconButton onClick={() => {
                    console.log("A");
                    const link = document.createElement('a');
                    link.target = "_blank";
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
    )
}

const NameComponent = (props) => {

    const { name, setName, save } = props;

    return (
        <FormControl>
            <TextField
                label={ tr('constants.name') }
                value={name}
                variant="outlined"
                color="primary"
                style={{ marginTop: "8px" }}
                onChange={(e) => setName(e.target.value)}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <AccountCircle />
                        </InputAdornment>
                    ),
                }}
                onBlur={save} />
        </FormControl>
    )
}

const DescriptionComponent = (props) => {

    const { description, setDescription, save } = props;

    return (
        <FormControl>
            <TextField
                label={ tr('constants.description') }
                value={description}
                variant="outlined"
                color="primary"
                style={{ marginTop: "8px" }}
                onChange={(e) => setDescription(e.target.value)}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <AccountCircle />
                        </InputAdornment>
                    ),
                }} 
                onBlur={save}/>
        </FormControl>
    )
}

const mapStateToProps = (state) => {
    const { currentIndex, picture } = state.pictureInfo;

    return {
        picture,
        currentIndex
    }
}

export default compose(
    connect(mapStateToProps, { changePicture }),
    withTranslate
)(PictureDevelopmentContainer);