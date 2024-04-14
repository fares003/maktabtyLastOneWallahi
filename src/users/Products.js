import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../rtk/slices/products-slice";
import NavBar from "../common-components/Navbar";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import "../style/products.css"
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
                        var amount;
                        if(product.saleInfo.listPrice.amount!=undefined){
amount=product.saleInfo.listPrice.amount;

                        }
                        else{
                            amount="NULL"
                        }
                        return (
<Col>
<div class="card">
  <div class="image_container">
<img className="image" src={product.volumeInfo.imageLinks.thumbnail}></img>
  </div>
  <div class="title">
    <span>{product.volumeInfo.title}</span>
  </div>
  
  <div class="action">
    <div class="price">
        
      <span>${amount}</span>
    </div>
    <button class="btn-23">
  <span class="text">Add to cart</span>
  <span aria-hidden="" class="marquee">Buy</span>
</button>
  </div>
</div>

                          </Col>
);


                    })}
                </Row>

            </Container>

        </>
    );
}
export default Products;