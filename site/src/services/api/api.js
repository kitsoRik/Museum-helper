import Axios from "axios"
export const apiHost = `http://5.45.118.116:3006`;
export const picturesIconsBaseUrl = `${apiHost}/static/pictureIcons/`;
export const museumsIconsBaseUrl = `${apiHost}/static/pictureIcons/`;

Axios.defaults.baseURL = apiHost;
Axios.defaults.withCredentials = true;

const AxiosPost = (url, params = {}) => 
            Axios.post(url, params)
                .then(({ data }) => data)
                .catch((res) => console.log);

const AxiosPostMultipart = (url, params = {}) => 
            Axios.post(url, params, { headers: {'Content-Type': 'multipart/form-data' }})
                .then(({ data }) => data)
                .catch((res) => console.log);


const getUserData = () =>
    AxiosPost(`/getData`);

const getLoginIn = (email, password) => 
    AxiosPost(`/loginIn`, { email, password });

const unlogin = () => 
    AxiosPost(`/unlogin`);

const getRegisterIn = (username, email, password, passwordConfirm) => 
    AxiosPost(`/registerIn`, { username, email, password, passwordConfirm });

const getMuseum = (museumId) => 
    AxiosPost(`/getMuseum`, { museumId });

const getMuseums = () => 
    AxiosPost(`/getMuseums`);

const addMuseum = (name, location) =>
    AxiosPost(`/addMuseum`, { name, location });

const removeMuseum = (museumId) => 
    AxiosPost(`/removeMuseum`, { museumId });

const changeMuseumData = (museumId, changes) =>
    AxiosPost(`/changeMuseumData`, { museumId, changes });

const newReleaseMuseum = (museumId) => 
    AxiosPost(`/newReleaseMuseum`, { museumId });

const getPicturesData = (searchParams, limit, pageNumber) => 
    AxiosPost(`/getPicturesData`, { searchParams, limit, pageNumber })

const getPictureData = (id) => 
    AxiosPost(`/getPictureData`, { id });

 const savePictureData = (id, changes) =>
    AxiosPost(`/savePictureData`, { id, changes });

const savePictureInfo = (id, changes) => 
    AxiosPost(`/savePictureInfo`, { id, changes });

const addPicture = (museumId, name, description, qrcode) => 
    AxiosPost(`/addPicture`, { museumId, name, description, qrcode });

const deletePicture = (id, { searchParams, pageNumber, limit}) => 
    AxiosPost(`/deletePicture`, { id, searchParams, pageNumber, limit });

const addLanguageInfo = (pictureId, title, description, language) =>
    AxiosPost(`/addPictureInfo`, { pictureId, title, description, language });

const getFavotires = () => 
    AxiosPost(`/getFavorites`);

const saveFavotires = ({groups}) => 
    AxiosPost(`/saveFavorites`, { groups });

const addPictureToFavorites = (id) => 
    AxiosPost(`/addPictureToFavorites`, { id });

const deletePictureFromFavorites = (id) => 
    AxiosPost(`/deletePictureFromFavorites`, { id });

const addFavoriteGroup = (name, description) => 
    AxiosPost(`/addFavoriteGroup`, { name, description });

const deleteFavoriteGroup = (id) => 
    AxiosPost(`/deleteFavoriteGroup`, { id });

const addIconToPicture = (id, iconFile) => {
    var formData = new FormData();
    formData.append("id", id);
    formData.append("icon", iconFile, "icon");

    return AxiosPostMultipart(`/addIconToPicture`, formData);
}

const deleteIconFromPicture = (id) => 
    AxiosPost(`/deleteIconFromPicture`, { id });

export default {
    getUserData,
    getLoginIn,
    unlogin,
    getRegisterIn,
    getMuseum,
    getMuseums,
    addMuseum,
    removeMuseum,
    changeMuseumData,
    newReleaseMuseum,
    getPicturesData,
    getPictureData,
    savePictureData,
    savePictureInfo,
    addPicture,
    deletePicture,
    addLanguageInfo,
    getFavotires,
    saveFavotires,
    addPictureToFavorites,
    deletePictureFromFavorites,
    addFavoriteGroup,
    deleteFavoriteGroup,
    addIconToPicture,
    deleteIconFromPicture,
};