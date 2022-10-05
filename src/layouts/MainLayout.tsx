import React from 'react';
import Header from '../components/Header/Header';
import { Outlet } from 'react-router-dom';

const MainLayout: React.FC = () => {
  return (
    <>
      <Header />
      <div className="content">
        {/* добавляем outlet, где нужно рендерить динамич роутеры*/}
        <Outlet />
      </div>
    </>
  );
};

export default MainLayout;
