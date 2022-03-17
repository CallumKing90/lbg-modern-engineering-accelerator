import React from 'react';

const Navbar = ({ onNavChange }) => (
  <nav>
    <ul>
      <li>
        <button onClick={() => onNavChange('Home')}>Home</button>
      </li>
      <li>
        <button onClick={() => onNavChange('About')}>About</button>
      </li>
      <li>
        <button onClick={() => onNavChange('Contact')}>Contact</button>
      </li>
      <li>
        <button onClick={() => onNavChange('StarWars')}>Star Wars</button>
      </li>
    </ul>
  </nav>
);

export default Navbar;
