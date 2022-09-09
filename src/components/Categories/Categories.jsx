import React from 'react';
import style from './Categories.module.css';

const categoriesList = ['Все товары', 'Квестики', 'Игры', 'Разное', 'Тетради', 'Отзывы'];

const Categories = ({ value, onChangeCategory }) => {
  return (
    <div className={style.list}>
      {categoriesList.map((categoryName, index) => (
        <div
          onClick={() => onChangeCategory(index)}
          className={`${style.listItem} ${value === index ? `${style.listItemActive}` : ''}`}
          key={index}>
          {categoryName}
        </div>
      ))}
    </div>
  );
};

export default Categories;
