import React from 'react';
import Categories from '../Categories/Categories';
import Search from '../Search/Search';
import Sort from '../Sort/Sort';
import StoreItem from '../StoreItem/StoreItem';
import Skeleton from '../Skeleton/Skeleton';
import { SearchContext } from '../../App';
import style from './Shop.module.css';

const Shop = () => {
  const { searchValue } = React.useContext(SearchContext);

  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [categoryId, setCategoryId] = React.useState(0);
  const [sortType, setSortType] = React.useState({
    name: 'Сначала популярные',
    sortProperty: 'rating',
  });

  // filterSettings
  const category = categoryId > 0 ? `&category=${categoryId}` : '';
  const sortBy = sortType.sortProperty.replace('-', '');
  const order = sortType.sortProperty.includes('-') ? 'asc' : 'desc';
  // search
  const search = searchValue ? `&search=${searchValue}` : '';

  React.useEffect(() => {
    setIsLoading(true);
    fetch(
      `https://631717b482797be77ff302e4.mockapi.io/items?${category}&sortBy=${sortBy}&order=${order}${search}`,
    )
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        setItems(json);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
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
          <Categories value={categoryId} onChangeCategory={(index) => setCategoryId(index)} />
        </div>
        <div className={style.bottomSettings}>
          <Search />
          <div className={style.settingsRightSide}>
            <Sort value={sortType} onChangeSort={(item) => setSortType(item)} />
            <div className={style.settingsSortAge}>{/* sortAge */}</div>
          </div>
        </div>
      </div>
      <div className={style.itemBody}>{isLoading ? renderSkeletons : renderItems}</div>
    </div>
  );
};

export default Shop;
