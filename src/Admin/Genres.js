import { Button, Container } from "react-bootstrap";
import NavBar from "../common-components/Navbar"
import Table from 'react-bootstrap/Table';
import '../style/genres.css'
import { useEffect, useState } from "react";
import { axiosPrivate } from "../api/axios";
function Genres(){
    const [newGenre,setNewGenre]=useState('')
    const [allGenres,setAllGenres]=useState([])
const handleAddGerne=async()=>{
    const fetchData = async () => {
            try {
              const res = await axiosPrivate.post('/genres', {
                
                  genre: newGenre
                
              });
            } catch (error) {
              console.error("Error fetching data:", error);
            }
          };
        
          fetchData();
}
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
}, []);

    return(<>
    <NavBar/>
    <Container className="genres-cont">
    <Table striped bordered hover >
    <thead>
        <tr>
          <th>#</th>
          <th>First Name</th>
            <th>delete</th>
        </tr>
      </thead>
      <tbody>
  {allGenres.length > 0 ? (
    allGenres.map((Genre, index) => (
      <tr key={index}>
        <td>{index + 1}</td>
        <td>{Genre.genre}</td>
        <td>
          <Button variant="danger">delete</Button>
        </td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan="3">No genres found</td>
    </tr>
  )}
  <tr>
    <td>{allGenres.length + 1}</td>
    <td>
      <input
        type="text"
        className="add-genre"
        placeholder="write the new genre here"
        onChange={(e) => setNewGenre(e.target.value)}
      />
    </td>
    <td>
      <Button variant="info" onClick={() => handleAddGerne()}>
        Add +
      </Button>
    </td>
  </tr>
</tbody>



    </Table>
    </Container>
    </>)
}

export default Genres