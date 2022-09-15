import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import style from './ShoppingCart.module.css';
import CartItem from '../../components/CartItem/CartItem';
import EmptyCart from '../../components/EmptyCart/EmptyCart';

const ShoppingCart = () => {
  const dispatch = useDispatch();
  const { items, totalPrice } = useSelector((state) => state.cart);
  const totalCount = items.reduce((sum, item) => sum + item.count, 0);

  if (!totalPrice) {
    return <EmptyCart />;
  }

  return (
    <div className={style.container}>
      <div class={style.wrapper}>
        <div className={style.head}>
          <Link to="/" className={style.link}>
            ← Каталог
          </Link>
          <span className={style.title}>Корзина</span>
        </div>
        <div className={style.body}>
          <div className={style.leftSide}>
            {items.map((item) => (
              <CartItem key={item.id} {...item} />
            ))}
          </div>
          <div className={style.rightSide}>
            <div className={style.ordering}>
              <div className={style.orderingItems}>
                <span>Товары: {totalCount} шт.</span>
                <span>{totalPrice} ₽</span>
              </div>
              <button className={`btnPrimary ${style.orderingBtn}`}>Перейти к оформлению</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
