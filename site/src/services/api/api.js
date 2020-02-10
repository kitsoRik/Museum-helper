import Axios from "axios"

const host = "http://5.45.118.116:3006"

export const apiHost = host;

export const getUserData = () => {
    return Axios.post(`${host}/getData`, { }, { withCredentials: true})
                    .then(({ data }) => data)
                    .catch((res) => catchProblem);
}

export const getLoginIn = (email, password) => {
    const params = {
        email,
        password
    };
    const queryParams = {
        withCredentials: true
    };
    return Axios.post(`${host}/loginIn`, params, queryParams)
                .then(({ data }) => data)
                .catch((res) => catchProblem);
}

export const unlogin = () => {
    const params = {};
    const queryParams = {
        withCredentials: true
    };
    return Axios.post(`${host}/unlogin`, params, queryParams)
                .then(({ data }) => data)
                .catch((res) => catchProblem);
}

export const getRegisterIn = (data) => {
    const params = data;
    const queryParams = {
        withCredentials: true
    };
    return Axios.post(`${host}/registerIn`, params, queryParams)
                .then(({ data }) => data)
                .catch((res) => catchProblem);
}

export const getPicturesData = (searchParams) => {
    const params = { searchParams };
    const queryParams = {
        withCredentials: true
    };
    return Axios.post(`${host}/getPicturesData`, params, queryParams)
                .then(({ data }) => data)
                .catch((res) => catchProblem);
}

export const getPictureData = (id) => {
    const params = {id};
    const queryParams = {
        withCredentials: true
    };
    return Axios.post(`${host}/getPictureData`, params, queryParams)
                .then(({ data }) => data)
                .catch((res) => catchProblem);
}

export const savePictureData = (id, changes) => {
    const params = { id, changes };
    const queryParams = {
        withCredentials: true
    };
    return Axios.post(`${host}/savePictureData`, params, queryParams)
                .then(({ data }) => data)
                .catch((res) => catchProblem);
}

export const savePictureInfo = (id, changes) => {
    const params = { id, changes };
    const queryParams = {
        withCredentials: true
    };

    return Axios.post(`${host}/savePictureInfo`, params, queryParams)
                .then(({ data }) => data)
                .catch((res) => catchProblem);
}

export const addPicture = (name, description, qrcode) => {
    const params = {
        name, description, qrcode
    }

    const queryParams = {
        withCredentials: true
    };
    return Axios.post(`${host}/addPicture`, params, queryParams)
        .then((res) => res.data)
        .catch((res) => catchProblem);
}

export const deletePicture = (id) => {
    const params = { id };
    const queryParams = {
        withCredentials: true
    };
    return Axios.post(`${host}/deletePicture`, params, queryParams)
        .then((res) => res.data)
        .catch((res) => catchProblem);
}

export const addLanguageInfo = (pictureId, title, description, language) => {
    const params = { pictureId, title, description, language };
    const queryParams = {
        withCredentials: true
    };
    return Axios.post(`${host}/addPictureInfo`, params, queryParams)
        .then((res) => res.data)
        .catch((res) => catchProblem);
}

export const getFavotires = () => {
    const params = {};
    const queryParams = {
        withCredentials: true
    };
    return Axios.post(`${host}/getFavorites`, params, queryParams)
        .then((res) => res.data)
        .catch((res) => catchProblem);
}

export const saveFavotires = (groups) => {
    const params = { groups };
    const queryParams = {
        withCredentials: true
    };
    return Axios.post(`${host}/saveFavorites`, params, queryParams)
        .then((res) => res.data)
        .catch((res) => catchProblem);
}

export const addPictureToFavorites = (id) => {
    const params = { id };
    const queryParams = {
        withCredentials: true
    };
    return Axios.post(`${host}/addPictureToFavorites`, params, queryParams)
        .then((res) => res.data)
        .catch((res) => catchProblem);
}

export const deletePictureFromFavorites = (id) => {
    const params = { id };
    const queryParams = {
        withCredentials: true
    };
    return Axios.post(`${host}/deletePictureFromFavorites`, params, queryParams)
        .then((res) => res.data)
        .catch((res) => catchProblem);
}

const addFavoriteGroup = (name, description) => {
    const params = { name, description };
    const queryParams = {
        withCredentials: true
    };
    return Axios.post(`${host}/addFavoriteGroup`, params, queryParams)
        .then((res) => res.data)
        .catch((res) => catchProblem);
}

const deleteFavoriteGroup = (id) => {
    const params = { id };
    const queryParams = {
        withCredentials: true
    };
    return Axios.post(`${host}/deleteFavoriteGroup`, params, queryParams)
        .then((res) => res.data)
        .catch((res) => catchProblem);
}

const addIconToPicture = (id, iconFile) => {
    var formData = new FormData();
    formData.append("id", id);
    formData.append("icon", iconFile, "icon");

    const queryParams = {
        withCredentials: true,
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    };
    return Axios.post(`${host}/addIconToPicture`, formData, queryParams)
        .then((res) => res.data)
        .catch((res) => catchProblem);
}

const deleteIconFromPicture = (id) => {
    const params = { id };
    const queryParams = {
        withCredentials: true
    };
    return Axios.post(`${host}/deleteIconFromPicture`, params, queryParams)
        .then((res) => res.data)
        .catch((res) => catchProblem);
}

export default {
    addFavoriteGroup,
    deleteFavoriteGroup,
    addIconToPicture,
    deleteIconFromPicture
};

const catchProblem = (res) => {
    console.log(res);
}