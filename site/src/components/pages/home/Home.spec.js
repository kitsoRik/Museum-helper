import React from 'react';
import { shallow, mount } from "enzyme";
import Home from './Home';
import configureMockStore from 'redux-mock-store';

const mockStore = configureMockStore();

describe('HOME', () => {
    it('Other action should be as "login"', () => {
        const store = mockStore({ user: { loggedIn: false }});

        const home = shallow(<Home store={store} />).dive();
    });
});