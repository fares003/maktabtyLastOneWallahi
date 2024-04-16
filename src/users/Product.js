import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavBar from "../common-components/Navbar";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import "../style/product.css"
import Image from 'react-bootstrap/Image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import Reviews from "./Reviews";

function Product() {
    let params = useParams();
    const [product, setProduct] = useState();

    useEffect(() => {
        fetch(`http://localhost:9000/items/${params.id}`)
            .then((res) => res.json())
            .then((product) => setProduct(product));
    }, []);

    if (!product || !product.saleInfo) return null;

    const amount = product.saleInfo.listPrice && product.saleInfo.listPrice.amount ? product.saleInfo.listPrice.amount : "NULL";

    return (
        <>
            <NavBar />
            <Container className="product-details-container">
                <Row>
                    <Col sm={5} className="book-main-info">
                        <div className="fixed-content">
                            <Image src={product.volumeInfo.imageLinks.thumbnail} fluid className="book-image" />
                            <p>{amount}$ EG</p>
                            <button className="button type1">
                                <span className="btn-txt">Add to cart</span>
                            </button>
                            <div className="rate">
                                <FontAwesomeIcon icon={faStar} className="star" />
                                <FontAwesomeIcon icon={faStar} className="star" />
                                <FontAwesomeIcon icon={faStar} className="star" />
                                <FontAwesomeIcon icon={faStar} className="star" />
                                <FontAwesomeIcon icon={faStar} className="star" />
                            </div>
                            <span>Rate this book</span>
                        </div>
                    </Col>
                    <Col sm={7} className="book-additional-info">
                        <h3>{product.volumeInfo.title}</h3>
                        <div className="authors">
                            {product.volumeInfo.authors.map((author, index) => (
                                <span key={index} className="author">{author},</span>
                            ))}
                        </div>
                        <span className="desc">Book Description</span>
                        <p className="des">{product.volumeInfo.description}</p>
                        <div className="cats">
                            <span className="word">Categories:</span>
                            {product.volumeInfo.categories.map((category, index) => (
                                <span key={index} className="cat">{category}</span>
                            ))}
                        </div>
                        <p className="publ"><span>Publisher:</span> {product.volumeInfo.publisher}</p>
                        <p>First published at {product.volumeInfo.publishedDate}</p>
                        <p>{product.volumeInfo.pageCount} pages</p>
                        <Reviews productId={params.id}/>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default Product;
