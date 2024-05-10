import { useEffect, useState } from "react";
import NavBar from "../common-components/Navbar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import "../style/products.css";
import { Link } from "react-router-dom";
import useAxiosPrivate from "../hook/useAxiosPrivate";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch } from "react-redux";
import { addItemToCart, addToCart } from "../rtk/slices/cartSlice";
import useAuth from "../hook/useAuth";
import { useCart } from "../context/CartContext";
import { useGenre } from "../context/GenresContext";
import Form from "react-bootstrap/Form";
import { useBooks } from "../context/GetBooks";

function Products() {
  const axiosPrivate = useAxiosPrivate();
  const [searchTerm, setSearchTerm] = useState("");
  const [count, setCount] = useState(5);
  const { auth } = useAuth();
  const { addItemToCart,uniqueBooksMap } = useCart();
  const { allGenres } = useGenre();
  const [selectedGenres, setSelectedGenres] = useState([]);
  const { books, getBooks } = useBooks();
  const handleAddToCart = (id) => {
    const product = books.find((book) => book._id === id);
  
    if (!product) {
      console.error("Product not found");
      return;
    }
  
    const cartItemCount = uniqueBooksMap[id] || 0;
    if (cartItemCount < product.cont) {
      addItemToCart(id);
    } else {
      alert("Cannot add more of this item to the cart. Stock limit reached.");
    }
  };
  
  
  
  
  useEffect(() => {
    getBooks(selectedGenres, searchTerm);
  }, [selectedGenres, searchTerm]);

  return (
    <>
      <NavBar count={count} />
      <Container className="products_container">
        <Row className="d-flex justify-content-center">
          <Col sm={8}>
            <div className="search">
              <i className="fa fa-search"></i>
              <input
                type="text"
                className="form-control"
                placeholder="Search for books..."
                onChange={(e) => setSearchTerm(e.target.value)}
                value={searchTerm}
              />
              <Button className="btn bttnn btn-primary" onClick={getBooks}>
                Search
              </Button>
            </div>
            <div className="filter">
              {allGenres.map((Genre, index) => (
                <div key={Genre._id} className="mb-3 genre-check">
                  <Form.Check
                    type="checkbox"
                    id={`genre-${index}`}
                    label={Genre.genre}
                    onChange={(e) => {
                      const genre = Genre.genre;
                      if (e.target.checked) {
                        setSelectedGenres([...selectedGenres, genre]);
                      } else {
                        setSelectedGenres(
                          selectedGenres.filter(
                            (selectedGenre) => selectedGenre !== genre
                          )
                        );
                      }
                      // getBooks(); // Trigger a search when a checkbox is checked or unchecked
                    }}
                    checked={selectedGenres.includes(Genre.genre)}
                  />
                </div>
              ))}
            </div>
          </Col>
        </Row>
        <Row xs={1} md={2} lg={3} xl={4} xxl={5} className="g-3 products-cont">
          {books &&
            books.map((product) => {
              let priceElement = (
                <span className="price">{`$${Math.floor(product.price)}`}</span>
              );
              if (product.sale) {
                const priceBeforeSale = `$${Math.floor(product.price)}`;
                const priceAfterSale = `$${Math.floor(
                  product.price * (1 - product.sale / 100)
                )}`;
                priceElement = (
                  <div className="sale-price">
                    <span className="original-price">{priceBeforeSale}</span>
                    <span>{priceAfterSale}</span>
                  </div>
                );
              }
              return (
                <Col
                  key={product._id}
                  className="mb-3 product-in-products"
                  style={{ marginBottom: "30px" }}
                >
                  <Card>
                    <Link to={`/products/${product._id}`}>
                      <div className="image_container">
                        <img
                          className="image"
                          src={product.image}
                          alt={product.title}
                        />
                      </div>
                      <div className="stock-level">
                        {product.cont} in stock
                      </div>
                      <div className="title">
                        <span>{product.title}</span>
                      </div>
                    </Link>
                    <div className="action">
                      <div className="price">
                        <span>{priceElement}</span>
                      </div>

                      <Button
                        className="bttn"
                        onClick={() => handleAddToCart(product._id)}
                          disabled={product.cont <= 0}

                      >
                        + cart <FontAwesomeIcon icon={faCartShopping} />{" "}
                      </Button>
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
