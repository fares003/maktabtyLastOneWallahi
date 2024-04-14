import logo from './logo.svg';
import './App.css';
import Home from './common-components/Home';
import { Route, Routes } from 'react-router-dom';
import Products from './users/Products';
import Cart from './users/Cart';

function App() {
  return (
    <div className="App">
<Routes>
  <Route path='/' element={<Home/>}/>
  <Route path='/products' element={<Products/>}/>
  <Route path='/cart' element={<Cart/>}/>

</Routes>

    </div>
  );
}

export default App;
