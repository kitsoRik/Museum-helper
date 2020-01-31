import Axios from "axios"

const host = "http://localhost:3005"

export const getData = () => {
    return Axios.post(`${host}/getData`, { }, { withCredentials: true})
                    .then(({ data }) => data);
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
                .then(({ data }) => data);
}

export const getRegisterIn = (data) => {
    const params = data;
    const queryParams = {
        withCredentials: true
    };
    return Axios.post(`${host}/registerIn`, params, queryParams)
                .then(({ data }) => data);
}