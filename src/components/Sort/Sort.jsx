import React from 'react';
import style from './Sort.module.css';

const Sort = ({ value, onChangeSort }) => {
  const [open, setOpen] = React.useState(false);
  const sortItem = [
    { name: 'Сначала популярные', sortProperty: 'rating' },
    { name: 'Цена по убыванию', sortProperty: 'price' },
    { name: 'Цена по возрастанию', sortProperty: '-price' },
  ];
  const sortName = value.name;

  return (
    <div className={style.container}>
      <div className={style.label} onClick={() => setOpen(!open)}>
        {sortName}
      </div>
      {open && (
        <div className={style.popup}>
          {sortItem.map((item, index) => (
            <div
              key={index}
              onClick={() => onChangeSort(item)}
              className={`${style.item} ${value === index ? `${style.active}` : ''}`}>
              {item.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Sort;
