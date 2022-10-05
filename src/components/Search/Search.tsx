import React from 'react';
import debounce from 'lodash.debounce';
import { useDispatch } from 'react-redux';
import { setSearchValue } from '../../redux/slices/filterSlice';
import { ReactComponent as SearchIcon } from '../../assets/icon/search.svg';
import { ReactComponent as CloseIcon } from '../../assets/icon/close.svg';
import style from './Search.module.css';

const Search: React.FC = () => {
  const dispatch = useDispatch();
  const [value, setValue] = React.useState('');
  const inputRef = React.useRef<HTMLInputElement>(null);
  const onClearInput = () => {
    dispatch(setSearchValue(''));
    setValue('');
    inputRef.current?.focus(); // оператор опциональной последовательности
  };

  // debounce search and too many request stoping
  const updateSearchValue = React.useCallback(
    debounce((value) => {
      dispatch(setSearchValue(value));
    }, 1000),
    [],
  );

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
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
