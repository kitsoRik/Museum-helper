import { actionFactory } from "./helpers";
import api from "../services/api/api";

export const 
    LOAD_MUSEUM_PENDING = "LOAD_MUSEUM_PENDING",
    LOAD_MUSEUM_SUCCESS = "LOAD_MUSEUM_SUCCESS",
    LOAD_MUSEUM_FAIL = "LOAD_MUSEUM_FAIL",

    CHANGE_MUSEUM_DATA_PENDING = "CHANGE_MUSEUM_DATA_PENDING",
    CHANGE_MUSEUM_DATA_SUCCESS = "CHANGE_MUSEUM_DATA_SUCCESS",
    CHANGE_MUSEUM_DATA_FAIL = "CHANGE_MUSEUM_DATA_FAIL";

export const loadMuseumPending = () => ({
    type: LOAD_MUSEUM_PENDING
})
export const loadMuseumSuccess= ({ id, name, location }) => ({
    type: LOAD_MUSEUM_SUCCESS,
    id,
    name,
    location
})
export const loadMuseumFail = () => ({
    type: LOAD_MUSEUM_FAIL
})

export const loadMuseum = actionFactory(
    api.getMuseum,
    loadMuseumPending,
    loadMuseumSuccess,
    loadMuseumFail
)

export const changeMuseumDataPending = (id, changes) => ({
    type: CHANGE_MUSEUM_DATA_PENDING,
    changes
})

export const changeMuseumDataSuccess = (data, id, changes) => ({
    type: CHANGE_MUSEUM_DATA_SUCCESS,
    changes
})

export const changeMuseumDataFail = (data, id, changes) => ({
    type: CHANGE_MUSEUM_DATA_FAIL,
    changes
})

export const changeMuseumData = actionFactory(
    api.changeMuseumData,
    changeMuseumDataPending,
    changeMuseumDataSuccess,
    changeMuseumDataFail
)