import { getPicturesData, deletePicture, addPicture } from "../services/api/api";
import { alertAddNotificationCreator } from "./alertActions";

export const startLoadPicturesCreator = () => {
    return (dispatch) => {
        getPicturesData().then((data) => {
            if(data.success) {
                dispatch(alertAddNotificationCreator(`Pictures has been loaded`));
                dispatch(loadPicturesSuccessCreator(data.pictures));
            } else {
                dispatch(loadPicturesErrorCreator(data.error));
                dispatch(alertAddNotificationCreator(`Pictures has not been loaded`), "error");
            }
        }).catch(() => {
            dispatch(alertAddNotificationCreator(`Pictures has been loaded (server problem)`), "error");
        });
    }
};

export const loadPicturesSuccessCreator = (data) => {
    return {
        type: "LOAD_PICTURES_SUCCESS",
        data
    }
};

export const loadPicturesErrorCreator = (error) => {
    return {
        type: "LOAD_PICTURES_ERROR",
        error
    }
};

export const addPictureCreator = (name, description, qrcode, file, history) => {
    return (dispatch) => {
        addPicture(name, description, qrcode, file)
            .then((data) => {
                if(data.success) {
                    dispatch(alertAddNotificationCreator(`Picture has been added`));
                    history.push("/pictures");
                } else {
                    dispatch(alertAddNotificationCreator(`Picture has not been added`), "error");
                }
            }).catch(() => {
                dispatch(alertAddNotificationCreator(`Picture has been added (server problem)`), "error");
            });
    }
}

export const deletePictureCreator = (id) => {
    return (dispatch) => {
        deletePicture(id)
            .then((data) => {
                if(data.success) {
                    dispatch(alertAddNotificationCreator(`Picture had been deleted!`));
                    dispatch(deletePictureSuccessCreator(id, dispatch));
                }
            }).catch((r) => {
                dispatch(alertAddNotificationCreator(`Picture has not been deleted!`), "error");
            });
    }
}

export const deletePictureSuccessCreator = (id) => {
    return {
        type: "DELETE_PICTURE_SUCCESS",
        id
    }
}