import React from "react";
import { mount, shallow } from 'enzyme';
import NavBar from './NavBar';
import "jest-enzyme"

// import the auth0 hook
import { useAuth0 } from '../react-auth0-wrapper';
// create a dummy user profile
const user = {
  email: 'johndoe@me.com',
  email_verified: true,
  sub: 'google-oauth2|2147627834623744883746',
};
// intercept the useAuth0 function and mock it
jest.mock('../react-auth0-wrapper');

describe("Nav Bar Renders", () => {
    beforeEach(() => {
        // Mock the Auth0 hook and make it return a logged in state
        useAuth0.mockReturnValue({
            isAuthenticated: true,
            user,
            logout: jest.fn(),
            loginWithRedirect: jest.fn(),
        });
    });

    it("Nav bar rendering properly", () => {
        const wrapper = shallow(<NavBar />);
        expect(wrapper.find("#primary-menu")).toExist()
    })
})