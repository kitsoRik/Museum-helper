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

export const getRegisterIn = (data) => {
    const params = data;
    const queryParams = {
        withCredentials: true
    };
    return Axios.post(`${host}/registerIn`, params, queryParams)
                .then(({ data }) => data)
                .catch((res) => catchProblem);
}

export const getPicturesData = () => {
    const params = {limit: 3};
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

export const addPicture = (name, description, qrcode, iconFile) => {
    var formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("qrcode", qrcode);
    formData.append("icon", iconFile, "icon");

    const queryParams = {
        withCredentials: true,
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    };
    return Axios.post(`${host}/addPicture`, formData, queryParams)
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

const catchProblem = (res) => {
    console.log(res);
}