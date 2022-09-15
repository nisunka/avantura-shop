import React from 'react';
import debounce from 'lodash.debounce';
import { useDispatch } from 'react-redux';
import { ReactComponent as SearchIcon } from '../../assets/icon/search.svg';
import { ReactComponent as CloseIcon } from '../../assets/icon/close.svg';
import { SearchContext } from '../../App';
import style from './Search.module.css';

const Search = () => {
  const dispatch = useDispatch();
  const [value, setValue] = React.useState('');
  const { setSearchValue } = React.useContext(SearchContext);
  const inputRef = React.useRef();
  const onClearInput = () => {
    setSearchValue('');
    setValue('');
    inputRef.current.focus();
  };

  // debounce search and too many request stoping
  const updateSearchValue = React.useCallback(
    debounce((value) => {
      dispatch(setSearchValue(value));
    }, 1000),
    [],
  );

  const onChangeInput = (event) => {
    setValue(event.target.value);
    updateSearchValue(event.target.value);
  };

  return (
    <div className={style.wrapper}>
      <SearchIcon />
      <input
        ref={inputRef}
        type="text"
        className={style.input}
        value={value}
        onChange={onChangeInput}
      />
      {value && <CloseIcon onClick={onClearInput} />}
    </div>
  );
};

export default Search;
