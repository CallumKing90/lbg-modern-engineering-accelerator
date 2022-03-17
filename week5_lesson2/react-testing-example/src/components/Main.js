import React from 'react';
import StarWars from './StarWars';

const Main = ({ page }) => {
  if (page === 'StarWars') {
    return <StarWars />;
  }

  return (
    <main>
      <p className="large">{page}</p>
    </main>
  );
};

export default Main;
