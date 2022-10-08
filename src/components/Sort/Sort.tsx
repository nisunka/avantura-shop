import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ESortProperty, setSort } from '../../redux/slices/filterSlice';
import { useAppDispatch } from '../../redux/store';
import style from './Sort.module.css';

type TSortItem = {
  name: string;
  sortProperty: ESortProperty;
};

type PopupClick = MouseEvent & {
  path: Node[];
};

export const sortItem: TSortItem[] = [
  { name: 'Сначала популярные', sortProperty: ESortProperty.RATING },
  { name: 'Цена по убыванию', sortProperty: ESortProperty.PRICE },
  { name: 'Цена по возрастанию', sortProperty: ESortProperty.M_PRICE },
];

const Sort = () => {
  // redux
  const dispatch = useAppDispatch();
  const sort = useSelector((state: any) => state.filter.sort);

  const sortRef = React.useRef<HTMLDivElement>(null);

  const [open, setOpen] = React.useState(false);
  const sortName = sort.name;

  const onChangeSort = (item: TSortItem) => {
    dispatch(setSort(item));
    setOpen(false);
  };

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // sortRef.current проверка на null
      const _event = event as PopupClick;
      if (sortRef.current && !_event.path.includes(sortRef.current)) {
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
