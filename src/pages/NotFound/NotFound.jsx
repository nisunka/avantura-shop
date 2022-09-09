import React from 'react';
import { Link } from 'react-router-dom';
import NotFoundBlock from '../../components/NotFoundBlock/NotFoundBlock';

const NotFound = () => {
  return (
    <>
      <NotFoundBlock />
      <Link to="/">Назад</Link>
    </>
  );
};

export default NotFound;
