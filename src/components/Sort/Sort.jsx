import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSort } from '../../redux/slices/filterSlice';
import style from './Sort.module.css';

export const sortItem = [
  { name: 'Сначала популярные', sortProperty: 'rating' },
  { name: 'Цена по убыванию', sortProperty: 'price' },
  { name: 'Цена по возрастанию', sortProperty: '-price' },
];

const Sort = () => {
  // redux
  const dispatch = useDispatch();
  const sort = useSelector((state) => state.filter.sort);

  const sortRef = React.useRef();

  const [open, setOpen] = React.useState(false);
  const sortName = sort.name;

  const onChangeSort = (item) => {
    dispatch(setSort(item));
    setOpen(false);
  };

  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.path.includes(sortRef.current)) {
        setOpen(false);
      }
    };
    document.body.addEventListener('click', handleClickOutside);
    // говорим useEffect, если произошел анмаунт, то сделай это (если компонент будет размонтироваться)
    return () => document.body.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <div className={style.container} ref={sortRef}>
      <div className={style.label} onClick={() => setOpen(!open)}>
        {sortName}
      </div>
      {open && (
        <div className={style.popup}>
          {sortItem.map((item, index) => (
            <div
              key={index}
              onClick={() => onChangeSort(item)}
              className={`${style.item} ${sort === index ? `${style.active}` : ''}`}>
              {item.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Sort;
