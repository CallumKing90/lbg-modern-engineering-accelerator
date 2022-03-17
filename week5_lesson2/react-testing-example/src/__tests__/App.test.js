import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from '../components/App';

describe('<App />', () => {
  it('renders the welcome message', () => {
    render(<App />);
    expect(screen.getByText('Learn React Testing')).toBeInTheDocument();
  });

  it('matches snaphot on initial render', () => {
    const component = render(<App />);
    expect(component.baseElement).toMatchSnapshot();
  });

  it('matches snapshot after clicking About', () => {
    const component = render(<App />);

    // lets interact with the page
    const aboutButton = screen.getByText('About');
    fireEvent.click(aboutButton);

    expect(component.baseElement).toMatchSnapshot();
  });
});
