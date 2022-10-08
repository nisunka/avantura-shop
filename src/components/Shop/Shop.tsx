import React from 'react';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { setCategoryId, setFilters } from '../../redux/slices/filterSlice';
import Categories from '../Categories/Categories';
import Search from '../Search/Search';
import Sort, { sortItem } from '../Sort/Sort';
import StoreItem from '../StoreItem/StoreItem';
import Skeleton from '../Skeleton/Skeleton';
import style from './Shop.module.css';
import { fetchGoods } from '../../redux/slices/goodsSlice';
import { useAppDispatch } from '../../redux/store';

const Shop: React.FC = () => {
  const navigate = useNavigate();
  const isSearch = React.useRef(false); // чтобы 2 раза не рендерился сайт при загрузке. Проверка на поисковую строку
  const isMounted = React.useRef(false); // первый рендер

  // redux
  const dispatch = useAppDispatch();
  const { items, status } = useSelector((state: any) => state.goods);
  const { categoryId, sort, searchValue } = useSelector((state: any) => state.filter);
  const sortType = sort.sortProperty;

  const onChangeCategory = (index: number) => {
    dispatch(setCategoryId(index));
  };

  // получаем товары и сохраняем в адресную строку при помощи qs ниже
  const getItems = async () => {
    // setIsLoading(true);
    // filterSettings
    const category = categoryId > 0 ? `&category=${categoryId}` : '';
    const sortBy = sortType.replace('-', '');
    const order = sortType.includes('-') ? 'asc' : 'desc';
    // search
    const search = searchValue ? `&search=${searchValue}` : '';

    dispatch(fetchGoods({ category, sortBy, order, search }));
  };

  // useEffect, который отвечает за парсинг параметров которые у нас есть, связанные с фильтрацией наших пицц и вшивание их в адресную строчку
  // если изменили параметры и был первый рендер
  React.useEffect(() => {
    // если был первый рендер, тогда выполняй
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sortType,
        categoryId,
        searchValue,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sortType, searchValue]);

  // Проверяем, url параметры (если был первый рендер) и сохраняем в redux
  // substring(1) - убираем вопросительный знак
  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sort = sortItem.find((obj) => obj.sortProperty === params.sortProperty);
      dispatch(
        setFilters({
          searchValue,
          categoryId,
          sort: sort || sortItem[0],
        }),
      );
      isSearch.current = true; // филтры изменились, значит нужно ререндить
    }
  }, []);

  // если был первый рендер, запрашиваем товары
  React.useEffect(() => {
    if (!isSearch.current) {
      getItems();
    }
    isSearch.current = false;
  }, [categoryId, sortType, searchValue]);

  const renderSkeletons = [...new Array(16)].map((_, index) => <Skeleton key={index} />);
  const renderItems = items
    .filter((item: any) => {
      if (item.name.toLowerCase().includes(searchValue.toLowerCase())) {
        return true;
      } else {
        return false;
      }
    })
    .map((item: any) => <StoreItem {...item} key={item.id} />);

  return (
    <div className={style.container}>
      <div className={style.filterSettings}>
        <div className={style.topSettings}>
          <Categories value={categoryId} onChangeCategory={onChangeCategory} />
        </div>
        <div className={style.bottomSettings}>
          <Search />
          <div className={style.settingsRightSide}>
            <Sort />
            <div className={style.settingsSortAge}>{/* sortAge */}</div>
          </div>
        </div>
      </div>
      {status === 'error' ? (
        <div className={style.error}>
          <h2>Ой, что-то пошло не так</h2>
          <span>Не удалось получить игры с сервера :( Разбираемся</span>
        </div>
      ) : (
        <div className={style.itemBody}>{status === 'loading' ? renderSkeletons : renderItems}</div>
      )}
    </div>
  );
};

export default Shop;
