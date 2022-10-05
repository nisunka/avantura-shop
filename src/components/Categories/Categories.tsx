import React from 'react';
import style from './Categories.module.css';

type TCategoriesProps = {
  value: number;
  onChangeCategory: (index: number) => void; // функция не требует возвращения при помощи return
};

const categoriesList = ['Все товары', 'Квестики', 'Игры', 'Разное', 'Тетради'];

const Categories: React.FC<TCategoriesProps> = ({ value, onChangeCategory }) => {
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
