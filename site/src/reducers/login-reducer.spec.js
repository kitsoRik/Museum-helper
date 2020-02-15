import { LOGIN_IN_PENDING, loginInPending, LOGIN_IN_FAIL, loginInFail, LOGIN_IN_SUCCESS, loginInSuccess } from "../actions/loginActions";
import loginReducer from "./login-reducer";


describe('LOGIN REDUCER', () => {
    const initState = {
        wait: false,
        error: false
    };

    it(`${LOGIN_IN_PENDING} should set wait to truthy and error to false`, () => {
        const nextState = loginReducer(initState, loginInPending());

        expect(nextState).toEqual({
            ...initState,
            wait: true,
            error: false
        });
    });

    it(`${LOGIN_IN_SUCCESS} should set error to false and wait to false`, () => {
        const nextState = loginReducer(initState, loginInSuccess());

        expect(nextState).toEqual({
            ...initState,
            wait: false,
            error: false
        });
    });

    it(`${LOGIN_IN_FAIL} should set error to truthy`, () => {
        const nextState = loginReducer(initState, loginInFail());

        expect(nextState).toEqual({
            ...initState,
            wait: false,
            error: true
        });
    });
});