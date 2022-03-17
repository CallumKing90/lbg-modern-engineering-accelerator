import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Navbar from '../components/Navbar';

describe('<Navbar />', () => {
  it('calls onNavChange when a button is clicked', () => {
    const mockOnNavChange = jest.fn();
    const component = render(<Navbar onNavChange={mockOnNavChange} />);

    const homeButton = component.getByText('Home');
    fireEvent.click(homeButton);

    expect(mockOnNavChange).toHaveBeenCalledTimes(1);
    expect(mockOnNavChange).toHaveBeenCalledWith('Home');
  });

  it('has 4 items', () => {
    const { getByText } = render(<Navbar onNavChange={() => {}} />);
    expect(getByText('Home')).toBeInTheDocument();
    expect(getByText('About')).toBeInTheDocument();
    expect(getByText('Contact')).toBeInTheDocument();
    expect(getByText('Star Wars')).toBeInTheDocument();
  });

  it('matches the snapshot', () => {
    const mockOnNavChange = jest.fn();
    const { baseElement } = render(<Navbar onNavChange={mockOnNavChange} />);
    expect(baseElement).toMatchSnapshot();
  });
});
