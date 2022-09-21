import React from 'react';
import axios from 'axios';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setCategoryId, setFilters } from '../../redux/slices/filterSlice';
import Categories from '../Categories/Categories';
import Search from '../Search/Search';
import Sort, { sortItem } from '../Sort/Sort';
import StoreItem from '../StoreItem/StoreItem';
import Skeleton from '../Skeleton/Skeleton';
import { SearchContext } from '../../App';
import style from './Shop.module.css';

const Shop = () => {
  const navigate = useNavigate();
  const isSearch = React.useRef(false); // чтобы 2 раза не рендерился сайт при загрузке. Проверка на поисковую строку
  const isMounted = React.useRef(false); // первый рендер

  // redux
  const dispatch = useDispatch();
  const { categoryId, sort } = useSelector((state) => state.filter);
  const sortType = sort.sortProperty;

  // context (временно)
  const { searchValue } = React.useContext(SearchContext);

  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const onChangeCategory = React.useCallback((index) => {
    dispatch(setCategoryId(index));
  }, []);

  // получаем товары и сохраняем в адресную строку при помощи qs ниже
  const fetchItems = async () => {
    setIsLoading(true);
    // filterSettings
    const category = categoryId > 0 ? `&category=${categoryId}` : '';
    const sortBy = sortType.replace('-', '');
    const order = sortType.includes('-') ? 'asc' : 'desc';
    // search
    const search = searchValue ? `&search=${searchValue}` : '';

    // код отправки запроса на сервер превращаем в синхронный, но тогда для отлова ошибок надо использовать try catch:
    try {
      const response = await axios.get(`https://631717b482797be77ff302e4.mockapi.io/items?${category}&sortBy=${sortBy}&order=${order}${search}`)
      setItems(response.data);
    } catch (error) {
      // вернет первую ошибку, которая произошла в коде
      console.log('Ошибка при получении товаров с сервера :(')
    } finally {
      setIsLoading(false);
    }
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
          ...params,
          sort,
        }),
      );
      isSearch.current = true; // филтры изменились, значит нужно ререндить
    }
  }, []);

  // если был первый рендер, запрашиваем товары
  React.useEffect(() => {
    if (!isSearch.current) {
      fetchItems();
    }
    isSearch.current = false;
  }, [categoryId, sortType, searchValue]);

  const renderSkeletons = [...new Array(16)].map((_, index) => <Skeleton key={index} />);
  const renderItems = items
    .filter((item) => {
      if (item.name.toLowerCase().includes(searchValue.toLowerCase())) {
        return true;
      } else {
        return false;
      }
    })
    .map((item) => (
      <div key={item.id}>
        <StoreItem {...item} />
      </div>
    ));

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
      <div className={style.itemBody}>{isLoading ? renderSkeletons : renderItems}</div>
    </div>
  );
};

export default Shop;
