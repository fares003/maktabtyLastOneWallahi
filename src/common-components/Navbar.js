import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import "../style/home.css"
import { Link } from 'react-router-dom';
function NavBar() {

  return (
    <>
      <Navbar fixed="top" className='navegator'> 
        <Container>
          <Link to="/" className='navbar-brand'>Maktabty</Link>
          <Nav className="me-auto">
            <Link to="/" className='nav-link'>Home</Link>
            <Link to="/products" className='nav-link'>All books</Link>
            <Link to="/cart" className='nav-link'>Cart</Link>
            <Link to="/Add" className='nav-link'>Add Book</Link>

          </Nav>
          <Nav>
            <Link to="/login" className='nav-link'>Log in</Link>
            <Link eventKey={2} to="/signup" className='nav-link'>
              Signup
            </Link>
          </Nav>
        </Container>
      </Navbar>

    </>
  );
}

export default NavBar;