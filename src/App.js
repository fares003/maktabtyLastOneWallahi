import logo from './logo.svg';
import './App.css';
import Home from './common-components/Home';
import { Route, Routes } from 'react-router-dom';
import Products from './users/Products';
import Cart from './users/Cart';
import Product from './users/Product';

function App() {
  return (
    <div className="App">
<Routes>
  <Route path='/' element={<Home/>}/>
  <Route path='/products' element={<Products/>}/>
  <Route path='/cart' element={<Cart/>}/>
  <Route path='/products/:id' element={<Product/>}/>

</Routes>

    </div>
  );
}

export default App;
