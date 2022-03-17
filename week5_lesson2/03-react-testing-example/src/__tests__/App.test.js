import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from '../components/App';

describe(App, () => {
  it('renders welcome message', () => {
    render(<App />);
    expect(screen.getByText('Learn React Testing')).toBeInTheDocument();
  });

  it('matches snapshot on initial render', () => {
    const app = render(<App />);
    // We'll check that the app matches the snapshot
    expect(app.baseElement).toMatchSnapshot();
  });

  it('matches snapshot after clicking About', () => {
    const app = render(<App />);

    // Let's change something by interacting with the page
    const aboutButton = screen.getByText('About');
    fireEvent.click(aboutButton);

    // Checking the rerender matches the snapshot
    expect(app.baseElement).toMatchSnapshot();
  });
});
