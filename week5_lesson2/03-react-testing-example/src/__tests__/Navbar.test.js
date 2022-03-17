import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import Navbar from '../components/Navbar';

describe(Navbar, () => {
  it('test rendering', () => {
    const component = render(<Navbar />);
    // Shows the built component in our terminal — check it out!
    component.debug();
  });

  it('clicking Home button calls onNavChange with "Home"', () => {
    // ARRANGE (aka Setup)
    // In the setup area of a test, we define anything we need to run the test.
    // A method like this is called a "mock"
    // It can have minor side-effects that we can test
    const mockHandleChange = jest.fn();
    const component = render(<Navbar onNavChange={mockHandleChange} />);

    // ACT (aka Execution)
    // We make the calls we need — in this case, getting a button and clicking it
    const homeButton = component.getByText('Home');
    // easy enough to fire a simple click
    fireEvent.click(homeButton);

    // ASSERT
    // test that Navbar called its onNavChange properly
    expect(mockHandleChange).toHaveBeenCalledTimes(1);
    expect(mockHandleChange).toHaveBeenCalledWith('Home');
  });
});
