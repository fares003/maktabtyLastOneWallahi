import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown'; // Import NavDropdown for dropdown menu
import { Link } from 'react-router-dom';
import useAuth from '../hook/useAuth';
import useLogout from '../hook/useLogout';
import image1 from '../common-components/images/image 2.png'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { fetchCart } from '../rtk/slices/cartSlice';
import useAxiosPrivate from '../hook/useAxiosPrivate';
import { useCart } from '../context/CartContext';

function NavBar(props) {
  const { auth } = useAuth();
  const logout = useLogout();
  const navigate = useNavigate(); // Get the navigate function
  const axiosPrivate=useAxiosPrivate()
  const {cart}=useCart()
  console.log(cart)

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const res = await axiosPrivate.post('/genres', {
          
  //           genre: "programming"
          
  //       });
  //       console.log(res.data); // Assuming you want to log the data received
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };
  
  //   fetchData();
  // }, []);
  const signout = async () => {
    await logout();
    navigate('/'); // Use navigate function to navigate
  };

  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" fixed="top">
        <Container>
          <Navbar.Brand as={Link} to="/"><img src={image1} className='bar-img' alt="Logo" /></Navbar.Brand>
          

          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
              <Nav.Link as={Link} to="/products">All books</Nav.Link>
              <Nav.Link as={Link} to="/cart">Cart <span className='num'>{cart.length}</span></Nav.Link>
              {auth && auth.roles && auth.roles.find(role => role === 5150) && (
                <>
                  <Nav.Link as={Link} to="/Add">Add Book</Nav.Link>
                  <Nav.Link as={Link} to="/Edit">Edit Book</Nav.Link>
                  <Nav.Link as={Link} to="/genres">Edit Genres</Nav.Link>

                </>
              )}
            </Nav>
            <Nav>
              {auth.accessToken ? 
                <button onClick={()=>signout()} className='nav-link'>Log out</button>: 
                <Nav.Link as={Link} to='/login'>Log in</Nav.Link>
              } 
              <Nav.Link as={Link} to="/signup">Signup</Nav.Link>
              <h5 className='username'>{auth.firstname} {auth.lastname}</h5>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default NavBar;
