import { FormGroup } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import "../style/reviews.css"
import { useState, useEffect } from "react";
import { Rating } from "react-simple-star-rating";
import { useParams } from "react-router-dom";
import useRefresh from "../hook/useRefresh";
import useAxiosPrivate from "../hook/useAxiosPrivate";
import useAuth from '../hook/useAuth';
import Swal from "sweetalert2";

function Reviews(props) {
    const { auth } = useAuth();
    const axiosPrivate=useAxiosPrivate()

    const [reviews, setReviews] = useState([]);
    const [updateReviews, setUpdateReviews] = useState(false);
    const [isReviewAdded, setIsReviewAdded] = useState(false);
    const [review, setReview] = useState( '');
    const [rate, setRate] = useState( 0);

    const handleRatingChange = (value) => {
       setRate(value)
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
            const res = await axiosPrivate.post(`/books/${props.productId}/reviews`, JSON.stringify({ review: review,rate:rate,firstname:auth.firstname,lastname:auth.lastname }))
            setUpdateReviews(prevState => !prevState);
            setIsReviewAdded(true);
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Your work has been saved",
                showConfirmButton: false,
                timer: 1500
              });
              window.location.reload(false)
            setReview('');

            } catch (error) {
            console.error('Failed to fetch product:', error);
            }
        }

        return (
            <div className="reviews">
                <h2>Create Review</h2>
                <Form onSubmit={handleSubmit} className="mb-5">
                    <Form.Group className="mb-3 rating">
                        <Rating
                            initialValue={rate}
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
