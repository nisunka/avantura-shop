import React from 'react';
import { ReactComponent as BirthdayIcon } from '../../assets/icon/birthday.svg';
import { ReactComponent as GraduateIcon } from '../../assets/icon/graduate.svg';
import style from './StoreItem.module.css';

const StoreItem = ({ age, descr, direction, imgUrl, name, price }) => {
  const [count, setCount] = React.useState(1);

  const onClickAdd = () => {
    setCount(count + 1);
  };

  return (
    <div className={style.card}>
      <img src={imgUrl} alt="product" className={style.img} />
      <div className={style.body}>
        <h3 className={style.title}>{name}</h3>
        <span className={style.description}>{descr}</span>
      </div>
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
