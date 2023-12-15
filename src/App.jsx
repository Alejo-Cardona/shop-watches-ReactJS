/* Custom */
import './App.module.css';

/* Components */
import { BrowserRouter, Routes, Route } from 'react-router-dom'; 
import NavBarSite from './components/NavBarSite/NavBarSite';

/* Views */
import Home from "./views/Home/Home";
import Error404 from "./views/Error404/Error404";
import ItemDatail from './views/ItemDetail/ItemDetail';
import Cart from './views/Cart/Cart'

/* Contexts */
import CartState from './contexts/CartContext';


function App() {
  return (
    <CartState>
      <BrowserRouter>
        <NavBarSite />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/Cart' element={<Cart />} ></Route>
            <Route path='/products/:id' element={<ItemDatail />} />
            <Route path='*' element={<Error404 />} />
          </Routes>
      </BrowserRouter>
    </CartState>
    
  )
}

export default App;
