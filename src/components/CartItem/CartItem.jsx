import React from 'react';
import { useDispatch } from 'react-redux';
import { addItem, minusItem, removeItem } from '../../redux/slices/cartSlice';
import { ReactComponent as PlusIcon } from '../../assets/icon/plus.svg';
import { ReactComponent as MinusIcon } from '../../assets/icon/minus.svg';
import { ReactComponent as DeleteIcon } from '../../assets/icon/delete.svg';
import style from './CartItem.module.css';

const CartItem = ({ id, name, price, count, imgUrl, descr }) => {
  const dispatch = useDispatch();
  const onClickPlus = () => {
    dispatch(
      addItem({
        id,
      }),
    );
  };
  const onClickMinus = () => {
    dispatch(minusItem(id));
  };
  const onClickRemove = () => {
    dispatch(removeItem(id));
  };
  return (
    <div className={style.wrapper}>
      <img src={imgUrl} alt="product" className={style.img} />
      <div className={style.info}>
        <span className={style.title}>{name}</span>
        <span className={style.description}>{descr}</span>
        <span className={style.price}>{price} / шт.</span>
      </div>
      <div className={style.count}>
        <button onClick={onClickMinus}>
          <MinusIcon />
        </button>
        {count} шт.
        <button>
          <PlusIcon onClick={onClickPlus} />
        </button>
      </div>
      <span className={style.totalPrice}>{price * count} ₽</span>
      <button onClick={onClickRemove}>
        <DeleteIcon />
      </button>
    </div>
  );
};

export default CartItem;
