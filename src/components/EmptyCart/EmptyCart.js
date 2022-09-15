import React from 'react';
import { Link } from 'react-router-dom';
import style from './EmptyCart.module.css';

const EmptyCart = () => {
  return (
    <div class={style.wrapper}>
      <div className={style.body}>
        <span className={style.title}>Ой, а корзина пустая...</span>
        <span className={style.descr}>
          Не определились, что действительно понравится ребёнку? Мы знаем всё о наших играх.
          Позвоните нам 😉
        </span>
        <Link to="/" className={style.link}>
          ← Вернуться в каталог
        </Link>
      </div>
    </div>
  );
};

export default EmptyCart;
