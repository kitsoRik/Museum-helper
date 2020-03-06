import { actionFactory } from "./helpers";
import api from "../services/api/api";

export const
    LOAD_MUSEUMS_PENDING = "LOAD_MUSEUMS_PENDING",
    LOAD_MUSEUMS_SUCCESS = "LOAD_MUSEUMS_SUCCESS",
    LOAD_MUSEUMS_FAIL = "LOAD_MUSEUMS_FAIL",

    ADD_MUSEUM_PANDING = "ADD_MUSEUM_PANDING",
    ADD_MUSEUM_SUCCESS = "ADD_MUSEUM_SUCCESS",
    ADD_MUSEUM_FAIL = "ADD_MUSEUM_FAIL",

    NEW_RELEASE_MUSEUM_PENDING = "NEW_RELEASE_MUSEUM_PENDING",
    NEW_RELEASE_MUSEUM_SUCCESS = "NEW_RELEASE_MUSEUM_SUCCESS",
    NEW_RELEASE_MUSEUM_FAIL = "NEW_RELEASE_MUSEUM_FAIL",

    REMOVE_MUSEUM_SUCCESS = "REMOVE_MUSEUM_SUCCESS",
    REMOVE_MUSEUM_FAIL = "REMOVE_MUSEUM_FAIL";

const loadMuseumsPending = () => ({
    type: LOAD_MUSEUMS_PENDING
});

const loadMuseumsSuccess = ({ museums }) => ({
    type: LOAD_MUSEUMS_SUCCESS,
    museums
});

const loadMuseumsFail = () => ({
    type: LOAD_MUSEUMS_FAIL
});

export const loadMuseums = actionFactory(
    api.getMuseums,
    loadMuseumsPending,
    loadMuseumsSuccess,
    loadMuseumsFail
);

export const addMuseumPanding = () => ({
    type: ADD_MUSEUM_PANDING
});

export const addMuseumSuccess = ({ addedMuseum }) => ({
    type: ADD_MUSEUM_SUCCESS,
    addedMuseum
});

export const addMuseumFail = () => ({
    type: ADD_MUSEUM_FAIL
});

export const addMuseum = actionFactory(
    api.addMuseum,
    addMuseumPanding,
    addMuseumSuccess,
    addMuseumFail
);

export const newReleaseMuseumPending = () => ({
    type: NEW_RELEASE_MUSEUM_PENDING
});

export const newReleaseMuseumSuccess = (d, museumId) => ({
    type: NEW_RELEASE_MUSEUM_SUCCESS,
    id: museumId
});

export const newReleaseMuseumFail = () => ({
    type: NEW_RELEASE_MUSEUM_FAIL
});

export const newReleaseMuseum = actionFactory(
    api.newReleaseMuseum,
    newReleaseMuseumPending,
    newReleaseMuseumSuccess,
    newReleaseMuseumFail
);

export const removeMuseumSuccess = (data, id) => ({
    type: REMOVE_MUSEUM_SUCCESS,
    id
})

export const removeMuseumFail = () => ({
    type: REMOVE_MUSEUM_FAIL
})

export const removeMuseum = actionFactory(
    api.removeMuseum,
    null,
    removeMuseumSuccess,
    removeMuseumFail
)