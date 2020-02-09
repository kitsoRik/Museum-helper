import React, { useEffect, useState } from 'react';

import './picture-development-container.scss';
import PictureIcons from './picture-icons';
import { apiHost } from '../../../../../services/api/api';
import { connect } from 'react-redux';
import { InputAdornment, TextField, FormControl, ListItemSecondaryAction, IconButton, Tooltip } from '@material-ui/core';
import { AccountCircle, Delete, GetApp } from '@material-ui/icons';
import { changePictureCreator } from '../../../../../actions/picturesInfoActions';
import { debounce } from 'debounce';
import CropFreeIcon from '@material-ui/icons/CropFree';

const PictureDevelopmentContainer = (props) => {

    const { picture } = props;
    const { onPictureChanged } = props;

    const [name, setName] = useState(picture.name);
    const [description, setDescription] = useState(picture.description);
    const [qrcode, setQrcode] = useState(picture.qrcode);

    useEffect(() => onPictureChanged(picture.id, { name }), [name]);
    useEffect(() => onPictureChanged(picture.id, { description }), [description]);
    useEffect(() => onPictureChanged(picture.id, { qrcode }), [qrcode]);

    return (
        <div className="picture-development-container">
            <div className="picture-upper-panel-info">

                <NameComponent 
                        name={name}
                        setName={setName}/>
                <DescriptionComponent 
                        description={description}
                        setDescription={setDescription}/>
                <QrcodeComponent 
                        picture={picture}
                        qrcode={qrcode}
                        setQrcode={setQrcode}/>
            </div>
            <PictureIcons />
        </div>
    );
}

const QrcodeComponent = (props) => {

    const { picture, qrcode, setQrcode } = props;

    return (
        <FormControl>
            <TextField
                label={"QR Code"}
                value={qrcode}
                defaultValue=" "
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
                }} />
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

    const { name, setName } = props;

    return (
        <FormControl>
            <TextField
                label={"Name"}
                value={name}
                defaultValue=" "
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
                }} />
        </FormControl>
    )
}

const DescriptionComponent = (props) => {

    const { description, setDescription } = props;

    return (
        <FormControl>
            <TextField
                label={"Description"}
                value={description}
                defaultValue=" "
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
                }} />
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
                dispatch(changePictureCreator(id, changes))
            , 1000)
    }
}

export default connect(mapStateToProps, mapDipatchToProps)(PictureDevelopmentContainer);