import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addItem } from '../../redux/slices/cartSlice';
import { ReactComponent as BirthdayIcon } from '../../assets/icon/birthday.svg';
import { ReactComponent as GraduateIcon } from '../../assets/icon/graduate.svg';
import style from './StoreItem.module.css';

type TStoreItem = {
  id: string;
  age: number;
  descr: string;
  direction: string;
  imgUrl: string;
  name: string;
  price: number;
};

const StoreItem: React.FC<TStoreItem> = ({ id, age, descr, direction, imgUrl, name, price }) => {
  const dispatch = useDispatch();

  const onClickAdd = () => {
    const item = {
      id,
      name,
      price,
      imgUrl,
      descr,
    };
    dispatch(addItem(item));
  };

  return (
    <div className={style.card}>
      <Link to={`/items/${id}`} key={id}>
        <img src={imgUrl} alt="product" className={style.img} />
        <div className={style.body}>
          <h3 className={style.title}>{name}</h3>
          <span className={style.description}>{descr}</span>
        </div>
      </Link>
      <div className={style.directionInfo}>
        <div className={style.age}>
          <BirthdayIcon />
          <span>{age}+ лет</span>
        </div>
        <div className={style.direction}>
          <GraduateIcon />
          <span>{direction}</span>
        </div>
        <div className={style.bottomBlock}>
          <span className={style.price}>{price} ₽</span>
          <button onClick={onClickAdd} className={`${style.btn} btnPrimary`}>
            В корзину
          </button>
        </div>
      </div>
    </div>
  );
};

export default StoreItem;
