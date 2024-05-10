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
import image5 from '../common-components/images/Blank-Avatar.png'
function NavBar(props) {
  const { auth } = useAuth();
  const logout = useLogout();
  const navigate = useNavigate(); // Get the navigate function
  const axiosPrivate=useAxiosPrivate()
  const [userInfoo, setUserInfo] = useState({ image: null }); // Initialize with an object that has an image property
  const {cart}=useCart()

  const signout = async () => {
    await logout();
    window.location.reload(false)
    // Use navigate function to navigate
  };
  const featchUser = async () => {
    try {
      const res = await axiosPrivate.get(`/user/${auth.id}`);
      setUserInfo(res.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(()=>{
    featchUser()
  },[])
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
              <Nav.Link as={Link} to="/Help">Help</Nav.Link>

              {auth && auth.roles && auth.roles.find(role => role === 5150) && (
                <>
                  <Nav.Link as={Link} to="/inventory">DashBoard</Nav.Link>
                </>
              )}
            </Nav>
            <Nav className='user-info-nav'>
              {auth.accessToken ? 
                <button onClick={()=>signout()} className='nav-link'>Log out</button>: 
                <Nav.Link as={Link} to='/login'>Log in</Nav.Link>
              } 
              <Nav.Link as={Link} to="/signup">Signup</Nav.Link>
              <Nav.Link as={Link} to="/profile" className='username'>{auth.firstname} {auth.lastname}</Nav.Link>
              <img src={userInfoo.image ? userInfoo.image : image5} alt="Profile" />
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default NavBar;
