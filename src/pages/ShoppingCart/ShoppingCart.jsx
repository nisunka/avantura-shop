import React from 'react';
import { Link } from 'react-router-dom';
import style from './ShoppingCart.module.css';

const ShoppingCart = () => {
  return (
    <div className={style.container}>
      <div className={style.head}>
        <Link to="/">Назад</Link>
        <span>Корзина</span>
      </div>
      <div className={style.body}>
        <div className={style.leftSide}>{/* товары */}</div>
        <div className={style.rightSide}>{/* перейти к оформлению, колво товаров и сумма */}</div>
      </div>
    </div>
  );
};

export default ShoppingCart;
