import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { ReactComponent as Logo } from './../../assets/logo.svg';
import { ReactComponent as CartLogo } from './../../assets/icon/cart.svg';
import style from './Header.module.css';

const Header: React.FC = () => {
  const location = useLocation(); // чтобы была перерисовка и в корзине удалялся знак корзины в хедере
  const { items, totalPrice } = useSelector((state: any) => state.cart);
  const totalCount = items.reduce((sum: number, item: any) => sum + item.count, 0);

  return (
    <div className={style.container}>
      <div className={style.wrapper}>
        <Link to="/">
          <Logo />
        </Link>
        <div className={style.nav}>
          <Link to="">Магазин</Link>
          <a href="https://avantura.ru/about_us/" target="_blank" rel="noreferrer">
            О нас
          </a>
          <a href="https://avantura.ru/blog/">Блог</a>
          <a href="https://avantura.ru/gift/">Подарить квест</a>
          <a href="https://avantura.ru/contacts/">Контакты</a>
          <a href="tel:83433009671" className={style.navTel}>
            8 (343) 300-96-71
          </a>
        </div>
        {location.pathname !== '/cart' && (
          <Link to="/cart" className={style.cartLink}>
            <span className={style.priceItems}>{totalPrice} ₽</span>
            <div className={style.cartLogo}>
              <CartLogo />
              <div className={style.countItems}>
                <span>{totalCount}</span>
                {/* <CountItemImg /> */}
              </div>
            </div>
          </Link>
        )}
        {location.pathname === '/cart' && <div className={style.emptySpase}></div>}
      </div>
    </div>
  );
};

export default Header;
