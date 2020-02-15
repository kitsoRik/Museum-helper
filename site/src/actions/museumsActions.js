import { actionFactory } from "./helpers";
import api from "../services/api/api";

const
    LOAD_MUSEUMS_PENDING = "LOAD_MUSEUMS_PENDING",
    LOAD_MUSEUMS_SUCCESS = "LOAD_MUSEUMS_SUCCESS",
    LOAD_MUSEUMS_FAIL = "LOAD_MUSEUMS_FAIL";

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

export {
    LOAD_MUSEUMS_PENDING,
    LOAD_MUSEUMS_SUCCESS,
    LOAD_MUSEUMS_FAIL
};