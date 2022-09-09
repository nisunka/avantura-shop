import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Home from './pages/Home/Home';
import NotFound from './pages/NotFound/NotFound';
import ShoppingCart from './pages/ShoppingCart/ShoppingCart';

export const SearchContext = React.createContext();

const App = () => {
  const [searchValue, setSearchValue] = React.useState('');
  return (
    <>
      <SearchContext.Provider value={{ searchValue, setSearchValue }}>
        <Header />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<ShoppingCart />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </SearchContext.Provider>
    </>
  );
};

export default App;
