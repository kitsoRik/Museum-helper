import React, { useEffect, useState } from 'react';

import './picture-development-container.scss';
import PictureIcons from './picture-icons';
import { connect } from 'react-redux';
import { InputAdornment, TextField, FormControl, ListItemSecondaryAction, IconButton, Tooltip, Switch, FormControlLabel } from '@material-ui/core';
import { AccountCircle, GetApp } from '@material-ui/icons';
import { changePicture } from '../../../../../actions/picturesInfoActions';
import { debounce } from 'debounce';
import CropFreeIcon from '@material-ui/icons/CropFree';
import { tr } from '../../../../../services/i18n/i18n';
import { compose } from 'redux';
import withTranslate from '../../../../hocs/withTranslate';

const PictureDevelopmentContainer = (props) => {

    const { picture } = props;
    const { id } = picture;
    const { onPictureChanged, onPictureChangedImmidiate } = props;

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
                        save={() => onPictureChangedImmidiate(id, { name })}/>
                <DescriptionComponent 
                        description={description}
                        setDescription={setDescription}
                        save={() => onPictureChangedImmidiate(id, { description })}/>
                <QrcodeComponent 
                        qrcode={qrcode}
                        setQrcode={setQrcode}
                        save={() => onPictureChangedImmidiate(id, { qrcode })}/>  
                <FormControlLabel
                    style={{flexDirection: "row", margin: '0'}}
                    control={
                        <Switch 
                            color="primary"   
                            checked={ includeRelease === 1 } 
                            onChange={e => {
                                const v = e.target.checked ? 1 : 0;
                                setIncludeRelease(v);
                                
                                onPictureChangedImmidiate(id, { includeRelease: v });
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

const mapDipatchToProps = (dispatch, ownProps) => {
    return {
        onPictureChanged: debounce(
            (id, changes) =>
                dispatch(changePicture(id, changes))
            , 1000),
        onPictureChangedImmidiate: (id, changes) => dispatch(changePicture(id, changes))
    }
}

export default compose(
    connect(mapStateToProps, mapDipatchToProps),
    withTranslate
)(PictureDevelopmentContainer);