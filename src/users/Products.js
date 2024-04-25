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
import useRefresh from "../hook/useRefresh";
function Products() {
  const dispatch = useDispatch();

  const products = useSelector((state) => state.products);
  const refresh=useRefresh()

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
            if (!product ) return "null";

            // Check if listPrice and amount are defined
            const amount = product.price && product.price ? product.price : "NULL";

            return (
              <Col>
             
                <Link to={`/products/${product._id}`} class="card">
                  <div class="image_container">
                    <img className="image" src={product.image}></img>
                  </div>
                  <div class="title">
                    <span>{product.title}</span>
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