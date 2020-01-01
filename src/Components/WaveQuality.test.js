import React from "react";
import WaveQuality from "./WaveQuality"
import renderer from "react-test-renderer";
// import the auth0 hook
import { useAuth0 } from '../react-auth0-wrapper';

// intercept the useAuth0 function and mock it
jest.mock('../react-auth0-wrapper');
describe('Wave Quality', () => {
  test('Wave Quality Renders Properly when user logged in', () => {

    useAuth0.mockResolvedValue({isAuthenticated: true});
    const component = renderer.create(
      <WaveQuality />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  })
  test('Wave Quality Renders Properly when user not logged in', () => {

    useAuth0.mockResolvedValue({isAuthenticated: false});
    const component = renderer.create(
      <WaveQuality />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  })
})
