import { Button, Container } from "react-bootstrap";
import NavBar from "../common-components/Navbar"
import Table from 'react-bootstrap/Table';
import '../style/genres.css'
import { useEffect, useState } from "react";
import { axiosPrivate } from "../api/axios";
import Swal from "sweetalert2";
import { useGenre } from "../context/GenresContext";

function Genres() {
  const { allGenres, addGenreToDB } = useGenre();
  const [newGenre, setNewGenre] = useState('');

  const handleAddGerne = async () => {
    addGenreToDB(newGenre);

    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Your work has been saved',
      showConfirmButton: false,
      timer: 1500
    });
    // window.location.reload(false)
  };

  return (
    <>
      <NavBar />
      <Container className="genres-cont">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Genre</th>
              <th>Delete / Add</th>
            </tr>
          </thead>
          <tbody>
            {allGenres.length > 0 ? (
              allGenres.map((genre, index) => (
                <tr key={genre._id}>
                  <td>{index + 1}</td>
                  <td>{genre.genre}</td>
                  <td>
                    <Button variant="danger">Delete</Button>
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
                  placeholder="Write the new genre here"
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
    </>
  );
}

export default Genres;
