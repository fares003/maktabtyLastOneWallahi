import React, { createContext, useContext, useState, useEffect } from 'react';
import useAxiosPrivate from '../hook/useAxiosPrivate';
import useAuth from '../hook/useAuth';
const GenresContext = createContext();

export const GenreProvider = ({ children }) => {
  const [allGenres, setAllGenres] = useState([]);
  const axiosPrivate = useAxiosPrivate();
  const {auth}=useAuth()
  useEffect(() => {
    const fetchData = async () => {
        try {
            const res = await axiosPrivate.get('/genres');
            setAllGenres(res.data); // Update state with the data from the response
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    fetchData();
}, [auth.id]);

  const addGenreToDB = async (newGenre) => {
    try {
        const res = await axiosPrivate.post('/genres', {
          
            genre: newGenre
        })
        setAllGenres(res.data)
      } catch (error) {
        console.error("Error fetching data:", error);
      }
  };
const deleteGenre=async(id)=>{
  try {
    const res = await axiosPrivate.delete(`/genres/${id}`)
    setAllGenres(res.data)
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
  return (
    <GenresContext.Provider value={{ allGenres, addGenreToDB ,deleteGenre}}>{children}</GenresContext.Provider>
  );
};

export const useGenre = () => {
  const context = useContext(GenresContext);
  if (!context) {
    throw new Error('useGenre must be used within a CartProvider');
  }
  return context;
};
