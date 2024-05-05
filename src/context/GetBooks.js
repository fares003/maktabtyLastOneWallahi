import React, { createContext, useContext, useState, useEffect } from 'react';
import useAxiosPrivate from '../hook/useAxiosPrivate';
import useAuth from '../hook/useAuth';
const BooksContext = createContext();

export const BooksProvider = ({ children }) => {
  const [books, setAllbooks] = useState([]);
  const axiosPrivate = useAxiosPrivate();
  const {auth}=useAuth()
  const getBooks = async (selectedGenres,searchTerm) => {
    try {
      let genreQuery = '';
      if (selectedGenres.length > 0) {
        genreQuery = `${selectedGenres.join(',')}`;
      }
      const response = await axiosPrivate.get(`/books?search=${searchTerm}${genreQuery}`);
      console.log(response.data);
      setAllbooks(response.data);
    } catch (err) {
      console.error(err);
    }
  }
  return (
<BooksContext.Provider value={{ books, getBooks }}>{children}</BooksContext.Provider>
  );
};

export const useBooks = () => {
  const context = useContext(BooksContext);
  if (!context) {
    throw new Error('useGenre must be used within a CartProvider');
  }
  return context;
};
