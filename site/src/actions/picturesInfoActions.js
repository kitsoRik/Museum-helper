import api from "../services/api/api";
import { actionFactory } from './helpers';

export const 
    LOAD_PICTURE_INFO_SUCCESS = "LOAD_PICTURE_INFO_SUCCESS",
    CHANGE_PICTURE_INFO_SUCCESS = "CHANGE_PICTURE_INFO_SUCCESS",
    CHANGE_PICTURE_SUCCESS = "CHANGE_PICTURE_SUCCESS",
    TRIGGERED_ADD_LANGUAGE_INFO = "TRIGGERED_ADD_LANGUAGE_INFO",
    UNTRIGGERED_ADD_LANGUAGE_INFO = "UNTRIGGERED_ADD_LANGUAGE_INFO",
    LANGUAGE_INFO_ADDED = "LANGUAGE_INFO_ADDED",
    CHANGE_CURRENT_INDEX = "CHANGE_CURRENT_INDEX",
    ICON_TO_PICTURE_ADDED = "ICON_TO_PICTURE_ADDED",
    ICON_FROM_PICTURE_DELETED = "ICON_FROM_PICTURE_DELETED";


export const loadPictureInfoSuccess = ({ picture, pictureInfo }) => {
    return {
        type: LOAD_PICTURE_INFO_SUCCESS,
        picture,
        pictureInfo
    }
}

export const loadPictureInfo = actionFactory(
    api.getPictureData,
    null,
    loadPictureInfoSuccess
)

export const changePictureInfoSuccess = ({ changes }, id) => {
    return {
        type: CHANGE_PICTURE_INFO_SUCCESS,
        id,
        changes
    }
}

export const changePictureInfo = actionFactory(
    api.savePictureInfo,
    null,
    changePictureInfoSuccess
);

export const changePictureSuccess = (id, changes) => {
    return {
        type: CHANGE_PICTURE_SUCCESS,
        id,
        changes
    }
}

export const changePicture = actionFactory(
    api.savePictureData,
    null,
    changePictureSuccess
);

export const triggeredAddLanguageInfo = () => {
    return {
        type: TRIGGERED_ADD_LANGUAGE_INFO
    }
}

export const untriggeredAddLanguageInfo = () => {
    return {
        type: UNTRIGGERED_ADD_LANGUAGE_INFO
    }
}

export const addLanguageInfoSuccess = ({ addedPictureInfo }) => {
    return {
        type: LANGUAGE_INFO_ADDED,
        addedPictureInfo
    }
}

export const addLanguageInfo = actionFactory(
    api.addLanguageInfo,
    null,
    addLanguageInfoSuccess
);

export const changeCurrentIndex = (index) => {
    return {
        type: CHANGE_CURRENT_INDEX,
        index
    }
}

const addIconSuccess = ({ addedIcon }) => ({
    type: ICON_TO_PICTURE_ADDED,
    addedIcon
});

export const addIcon = actionFactory(
    api.addIconToPicture,
    null,
    addIconSuccess
);

const deleteIconSuccess = ({ id }) => ({
    type: ICON_FROM_PICTURE_DELETED,
    id
});

export const deleteIcon = actionFactory(
    api.deleteIconFromPicture,
    null,
    deleteIconSuccess
);