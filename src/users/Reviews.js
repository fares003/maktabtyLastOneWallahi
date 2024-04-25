import { FormGroup } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import "../style/reviews.css"
import { useState, useEffect } from "react";
import { Rating } from "react-simple-star-rating";
import { useParams } from "react-router-dom";
import useRefresh from "../hook/useRefresh";
import axios from "../api/axios";

function Reviews(props) {
    const [reviews, setReviews] = useState([]);
    const [updateReviews, setUpdateReviews] = useState(false);
    const [isReviewAdded, setIsReviewAdded] = useState(false);
    const [review, setReview] = useState( '');
    const handleRatingChange = (value) => {
        setReview(prevReview => ({ ...prevReview, stars: value }));
    };

    const handleReviewChange = (event) => {
        setReview(event.target.value);
    };
    const refresh = useRefresh();
    const handleSubmit = async(event) => {
        event.preventDefault();
        if (!review) {
            
            return 'Invalid entry please try agin'
        }
       

        try {
            const accessToken = await refresh();
            console.log("access token: " + accessToken);
            const res = await axios.post(`/books/${props.productId}/reviews`, JSON.stringify({ reviews: review }),
                {
                    headers: {
                        'content-type': 'application/json',
                        Authorization: `Bearer ${accessToken}`,
                    },
                    withCredentials: true,
                })
            setUpdateReviews(prevState => !prevState);
            setIsReviewAdded(true);
            setReview('');

            } catch (error) {
            console.error('Failed to fetch product:', error);
            }
        }

        return (
            <div className="reviews">
                <h2>Create Review:</h2>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3 rating">
                        <Rating
                            initialValue={review.stars}
                            size={24}
                            onClick={handleRatingChange}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3 review">
                        <textarea
                            value={review.text}
                            onChange={handleReviewChange}
                            placeholder="Write your review"
                            className="review-text"
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
                {isReviewAdded && <p>Review added successfully!</p>}
                <h2>All Reviews:</h2>

            </div>
        );
    }

    export default Reviews;
