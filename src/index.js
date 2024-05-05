import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css' 
import {BrowserRouter} from "react-router-dom"
import { Provider } from 'react-redux';
import { store } from './rtk/store';
import { AuthProvider } from './context/AuthProvider';
import { CartProvider } from './context/CartContext';
import { GenreProvider } from './context/GenresContext';
import { BooksProvider } from './context/GetBooks';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
   
    <BrowserRouter>
    <AuthProvider>
    <CartProvider>
    <GenreProvider>
    <BooksProvider>
    <Provider store={store}>
      
    <App />
    
    </Provider>
    </BooksProvider>
    </GenreProvider>
    </CartProvider>
    </AuthProvider>
    </BrowserRouter>
   
  </React.StrictMode>
);


reportWebVitals();
