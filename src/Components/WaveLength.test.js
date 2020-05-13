import React from "react";
import { mount, shallow } from 'enzyme';
import WaveLength from './WaveLength';
import StaticProgressBar from "./StaticProgressBar";
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

describe('components/WaveLength - logged in', () => {
  beforeEach(() => {
    // Mock the Auth0 hook and make it return a logged in state
    useAuth0.mockReturnValue({
      isAuthenticated: true,
      user,
      logout: jest.fn(),
      loginWithRedirect: jest.fn(),
    });
  });

  it('has value prop', () => {
    const wrapper = mount(<WaveLength attributeValue={20} />);
    expect(wrapper).toHaveProp("attributeValue");
  });

})

