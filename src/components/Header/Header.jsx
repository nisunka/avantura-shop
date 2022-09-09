import React from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as Logo } from './../../assets/logo.svg';
import { ReactComponent as CartLogo } from './../../assets/icon/cart.svg';
import style from './Header.module.css';

const Header = () => {
  return (
    <div className={style.container}>
      <div className={style.wrapper}>
        <Link to="/">
          <Logo />
        </Link>
        <div className={style.nav}>
          <Link to="">Магазин</Link>
          <a href="https://avantura.ru/about_us/" target="_blank">
            О нас
          </a>
          <a href="https://avantura.ru/blog/">Блог</a>
          <a href="https://avantura.ru/gift/">Подарить квест</a>
          <a href="https://avantura.ru/contacts/">Контакты</a>
          <a href="tel:83433009671" className={style.navTel}>
            8 (343) 300-96-71
          </a>
        </div>
        <Link to="/cart">
          <CartLogo />
        </Link>
      </div>
    </div>
  );
};

export default Header;
