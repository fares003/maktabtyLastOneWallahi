import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../rtk/slices/products-slice";
import NavBar from "../common-components/Navbar";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'; import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import "../style/products.css"
import { Link } from "react-router-dom";
function Products() {
  const dispatch = useDispatch();

  const products = useSelector((state) => state.products);
  console.log(products);
  useEffect(() => {
    dispatch(fetchProducts())
  }, [])
  return (
    <>
      <NavBar />

      <Container className="products_container">
        <Row>

          {products.map((product) => {
            //console.log(product.saleInfo.listPrice.amount)
            if (!product || !product.saleInfo) return "null";

            // Check if listPrice and amount are defined
            const amount = product.saleInfo.listPrice && product.saleInfo.listPrice.amount ? product.saleInfo.listPrice.amount : "NULL";

            return (
              <Col>
                <Link to={`/products/${product.id}`} class="card">
                  <div class="image_container">
                    <img className="image" src={product.volumeInfo.imageLinks.thumbnail}></img>
                  </div>
                  <div class="title">
                    <span>{product.volumeInfo.title}</span>
                  </div>

                  <div class="action">
                    <div class="price">

                      <span>${Math.floor(amount) }</span>
                    </div>
                    <button class="btn-23">
                      <span class="text">Add to cart</span>
                      <span aria-hidden="" class="marquee">Buy</span>
                    </button>
                  </div>
                </Link>

              </Col>
            );


          })}
        </Row>

      </Container>

    </>
  );
}
export default Products;