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
import useAxiosPrivate from "../hook/useAxiosPrivate";
import useRefresh from "../hook/useRefresh";
import { useDispatch, useSelector } from "react-redux";
import { fetchProduct } from "../rtk/slices/productSlice";
import { Rating } from "react-simple-star-rating";
import { capitalize } from "@mui/material";
import { useCart } from "../context/CartContext";

function Product() {
    const params = useParams();
    const [product, setProduct] = useState({});
    const {addItemToCart}=useCart()


    const handleAddToCart = (id) => {
        addItemToCart(id);
      };


    const refresh = useRefresh();
    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
      ];
      const axiosPrivate=useAxiosPrivate()

      const date = new Date(product.publishingdate);
      const monthName = months[date.getMonth()];
      const formattedDate = `${monthName} ${date.getDate()}, ${date.getFullYear()}`;
    useEffect(() => {
        const fetchProductInfo = async () => {
            try {
          
                const response = await axiosPrivate.get(`/books/${params.id}`);
                setProduct(response.data);
            } catch (error) {
                console.error('Failed to fetch product:', error);
            }
        };

        fetchProductInfo();
    }, [params.id]);

    if (!product) return null;

    const amount = product.price ? product.price : "NULL";
    
    // Calculate average rating
let averageRating = 0;
if (product.reviews && product.reviews.length > 0) {
    const totalRating = product.reviews.reduce((acc, review) => acc + parseInt(review.rate), 0);
    averageRating = totalRating / product.reviews.length;
}

    let uppercasetext = product.categories ? product.categories.toUpperCase() : "";
    return (
        <>
            <NavBar />
            <Container className="product-details-container">
                <Row>
                    <Col sm={5} className="book-main-info">
                    <div >
                            <Image src={product.image} fluid className="book-image" />
                            <p>{amount}$ EG</p>
                            <button className="button type1" onClick={() =>handleAddToCart(product._id) }>
                                <span className="btn-txt">Add to cart</span>
                            </button>
                            <Rating
                            initialValue={averageRating}
                            size={24}
                            readonly="true"
                            
                        />
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
                            <span className="word">Genres</span>
                            <p className="cat">{uppercasetext}</p> 
                        </div>
                        <p className="publ"><span>Publisher:</span> {product.publishername}</p>    
                          <p>First published {formattedDate}</p>
                        <p>{product.pages} pages</p>

                    </Col>
                    <Col>
                    <Reviews productId={params.id}/>
                        <ul>
                        {product.reviews && product.reviews.map((reviewi, index) => (
    <li key={index}>
        <p className="review"><div className="user-info"><span>{capitalize(reviewi.firstname)} {capitalize(reviewi.lastname)}</span><Rating initialValue={reviewi.rate} size={24} readonly="true"/>
</div> 
<p>
{reviewi.review}
</p>
</p>
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
