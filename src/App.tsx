import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import NotFound from './pages/NotFound/NotFound';
import ShoppingCart from './pages/ShoppingCart/ShoppingCart';
import FullItem from './pages/FullItem/FullItem';
import MainLayout from './layouts/MainLayout';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<Home />} />
        <Route path="cart" element={<ShoppingCart />} />
        <Route path="items/:id" element={<FullItem />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default App;
