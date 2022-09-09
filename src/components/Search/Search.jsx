import React from 'react';
import { ReactComponent as SearchIcon } from '../../assets/icon/search.svg';
import { ReactComponent as CloseIcon } from '../../assets/icon/close.svg';
import { SearchContext } from '../../App';
import style from './Search.module.css';

const Search = () => {
  const { searchValue, setSearchValue } = React.useContext(SearchContext);

  return (
    <div className={style.wrapper}>
      <SearchIcon />
      <input
        type="text"
        className={style.input}
        value={searchValue}
        onChange={(event) => setSearchValue(event.target.value)}
      />
      {searchValue && <CloseIcon onClick={() => setSearchValue('')} />}
    </div>
  );
};

export default Search;
