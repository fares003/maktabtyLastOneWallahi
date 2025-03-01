import logo from './logo.svg';
import './App.css';
import Home from './common-components/Home';
import { Route, Routes } from 'react-router-dom';
import Products from './users/Products';
import Cart from './users/Cart';
import Product from './users/Product';
import Signin from './common-components/Signin';
import Signup from './common-components/Signup';
import Add from './Admin/Add';
import Editbook from './Admin/Editbook';
import Updatebook from './Admin/Updatebook'
import RequireAuth from './common-components/RequireAuth';
import Footer from './common-components/Footer';
import PersistLogin from './common-components/PresistLogin';
import Unauthorized from './common-components/Unauthorized';
import Genres from './Admin/Genres';
import Payment from './common-components/Payment';
import Profile from './common-components/Profile';
import Inventory from './Admin/Inventory';
import Orders from './Admin/Orders';
import DeliveryPay from './common-components/DeliveryPay';
import Help from './common-components/Help';
function App() {
  const ROLES = {
    'User': 2001,
    'Editor': 1984,
    'Admin': 5150
  }


  return (
    <div className="App">
<Routes>
  <Route path='/login' element={<Signin/>} />
  <Route path='/signup' element={<Signup/>} />

  <Route path='/' element={<Home/>}/>
  <Route path='/Help' element={<Help/>}/>

  <Route element={<PersistLogin/>}>
  <Route element={<RequireAuth allowedRoles={[ROLES.User]}/>}>
  <Route path='/profile'  element={<Profile/>}/>
  <Route path='/payment' element={<Payment/>}/>
  <Route path='/products' element={<Products/>}/>
  <Route path='/products/:id' element={<Product/>}/>
  <Route path='/cart' element={<Cart/>}/>
  <Route path='/deliveryPay' element={<DeliveryPay/>}/>


  </Route>

  <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>

  <Route path='/inventory' element={<Inventory/>}/>
  <Route path='/Add' element={<Add type="add"/>}/>
  <Route path='/Edit' element={<Editbook/>}/>
  <Route path='/update/:id' element={<Updatebook/>}/>
  <Route path='/Genres' element={<Genres/>}/>
  <Route path='/Orders' element={<Orders/>}/>

  </Route>
  </Route>
  <Route path='unauthorized' element={<Unauthorized/>}/>
</Routes>
<Footer/>
    </div>
  );
}

export default App;
