import updateUser from './updateUser';
import { loginInSuccess, loginIn } from '../actions/userActions';

import AxiosMockAdapter from 'axios-mock-adapter';

import configureStore from 'redux-mock-store';

const mockStore = configureStore();
const axiosMock = new AxiosMockAdapter();

describe('Test user reducer', () => {
    it('Login in success', () => {
        const username = "Rostyslav", email = "email@gmail.com";
        const action = loginInSuccess({ username, email });

        expect(updateUser(undefined, action)).toEqual({ 
            loggedIn: true,
            username,
            email
        });
    });

    // const store = mockStore({});

    // beforeEach(() => store.clearActions());

    // it('Login in should get request', () => {
    //     axiosMock.onPost('./loginIn', {
    //         data: { username: "Rostik", email: "t@gmail.com" }
    //     })
    //     store.dispatch(loginIn())
    // });
});