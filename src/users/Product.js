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
import axios from "../api/axios";
import useRefresh from "../hook/useRefresh";
import { useDispatch, useSelector } from "react-redux";
import { fetchProduct } from "../rtk/slices/productSlice";

function Product() {
    const params = useParams();
    const [product, setProduct] = useState({});
    const refresh = useRefresh();
    useEffect(() => {
        const fetchProductInfo = async () => {
            try {
                const accessToken = await refresh();
                console.log("access token: " + accessToken);
                const response = await axios(`/books/${params.id}`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                setProduct(response.data);
            } catch (error) {
                console.error('Failed to fetch product:', error);
            }
        };

        fetchProductInfo();
    }, [params.id]);

    if (!product) return null;

    const amount = product.price ? product.price : "NULL";

    return (
        <>
            <NavBar />
            <Container className="product-details-container">
                <Row>
                    <Col sm={5} className="book-main-info">
                        <div className="fixed-content">
                            <Image src={product.image} fluid className="book-image" />
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
                        <h3>{product.title}</h3>
                        <div className="authors">
                            {product.author }
                        </div>
                        <span className="desc">Book Description</span>
                        <p className="des">{product.description}</p>
                        <div className="cats">
                            <span className="word">Categories:</span>
                            {product.categories }
                        </div>
                        <p className="publ"><span>Publisher:</span> {product.publishername}</p>
                        <p>First published at {product.publishingdate}</p>
                        <p>{/*page counts*/100} pages</p>
                        <Reviews productId={params.id}/>
                        <ul>
                        {product.reviews && product.reviews.map((review, index) => (
    <li key={index}>
        <p>Review: {review}</p>
    </li>
))}
            </ul>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default Product;
