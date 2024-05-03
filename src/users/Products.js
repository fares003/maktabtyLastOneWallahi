import { useEffect, useState } from "react";
import NavBar from "../common-components/Navbar";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import "../style/products.css"
import { Link } from "react-router-dom";
import useAxiosPrivate from "../hook/useAxiosPrivate";
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useDispatch } from "react-redux";
import { addItemToCart, addToCart } from "../rtk/slices/cartSlice";
import useAuth from "../hook/useAuth";
import { useCart } from "../context/CartContext";
function Products() {
  const axiosPrivate = useAxiosPrivate();
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [count,setCount]=useState(5)
  const {auth}=useAuth()
  const {addItemToCart}=useCart()
const dispatch=useDispatch()

const handleAddToCart = (id) => {
  addItemToCart(id);
};
  const getBooks = async () => {
    try {
      const response = await axiosPrivate.get(`/books?search=${searchTerm}`);
      console.log(response.data);
      setProducts(response.data);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    console.log(auth.id)
    getBooks();
  }, [searchTerm]);

  return (
    <>
      <NavBar count={count}/>
      <Container className="products_container">
        <Row className="d-flex justify-content-center">
          <Col sm={8} >
            <div className="search">
              <i className="fa fa-search"></i>
              <input type="text" className="form-control" placeholder="Search for books..." onChange={(e) => setSearchTerm(e.target.value)} value={searchTerm} />
              <Button className="btn bttnn btn-primary" onClick={getBooks}>Search</Button>
            </div>
          </Col>

        </Row>
        <Row xs={1} md={2} lg={3} xl={4} xxl={5} className="g-3 products-cont">
          {products && products.map((product) => {
            const amount = product.price ? `$${Math.floor(product.price)}` : "Price not available";
            return (
              <Col key={product._id} className="mb-3 product-in-products" style={{marginBottom: "30px"}}>
                <Card>
                <Link to={`/products/${product._id}`}>
                  <div className="image_container">
                    <img className="image" src={product.image} alt={product.title} />
                  </div>
                  <div className="title">
                    <span>{product.title}</span>
                  </div>
                  </Link>
                  <div className="action">
                    <div className="price">
                      <span>{amount}</span>
                    </div>
                    <Button className="bttn" onClick={() =>handleAddToCart(product._id) }>+ cart <FontAwesomeIcon icon={faCartShopping} /> </Button>
                  </div>
                  </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
}

export default Products;
