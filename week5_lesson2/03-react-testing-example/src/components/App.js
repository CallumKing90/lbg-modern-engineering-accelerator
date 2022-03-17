import React from 'react';
import Navbar from './Navbar';
import Main from './Main';
import '../styles/style.scss';

const App = () => {
  const [page, setPage] = React.useState('Click a button!');
  const onNavChange = (pageToGoTo) => setPage(pageToGoTo);

  return (
    <>
      <h1>Learn React Testing</h1>
      <Navbar onNavChange={onNavChange} />
      <Main page={page} />
    </>
  );
};

export default App;
