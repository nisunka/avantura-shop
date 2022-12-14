import React from 'react';
import { useDispatch } from 'react-redux';
import { addItem, minusItem, removeItem } from '../../redux/slices/cartSlice';
import { ReactComponent as PlusIcon } from '../../assets/icon/plus.svg';
import { ReactComponent as MinusIcon } from '../../assets/icon/minus.svg';
import { ReactComponent as DeleteIcon } from '../../assets/icon/delete.svg';
import style from './CartItem.module.css';

type TCartItem = {
  id: string;
  name: string;
  price: number;
  count: number;
  imgUrl: string;
  descr: string;
  category: string;
  direction: string;
  detail: string;
};

const CartItem: React.FC<TCartItem> = ({
  id,
  name,
  price,
  count,
  imgUrl,
  descr,
  category,
  direction,
  detail,
}) => {
  const dispatch = useDispatch();
  const onClickPlus = () => {
    dispatch(
      addItem({
        id,
        name,
        price,
        count,
        imgUrl,
        descr,
        category,
        direction,
        detail,
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
