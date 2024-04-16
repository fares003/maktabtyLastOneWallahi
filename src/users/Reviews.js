import { FormGroup } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import "../style/reviews.css"
import { useState, useEffect } from "react";
import { Rating } from "react-simple-star-rating";

function Reviews(props){
    const [reviews, setReviews] = useState([]);
    const [updateReviews, setUpdateReviews] = useState(false);
    const [isReviewAdded, setIsReviewAdded] = useState(false);
    const [review, setReview] = useState({ stars: 0, text: '' });

    
    useEffect(() => {
        fetch(`http://localhost:9000/items/${props.productId}`)
            .then(response => response.json())
            .then(data => setReviews(data));
    }, [updateReviews, props.productId]);

    const handleRatingChange = (value) => {
        setReview(prevReview => ({ ...prevReview, stars: value }));
    };

    const handleReviewChange = (event) => {
        setReview(prevReview => ({ ...prevReview, text: event.target.value }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        fetch(`http://localhost:9000/items/${props.productId}/volumeInfo`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(review)
        })
        .then(() => {
            setUpdateReviews(prevState => !prevState);
            setIsReviewAdded(true);
            setReview({ stars: 0, text: '' });
        });
    };

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
            <ul>
                {reviews.map((review, index) => (
                    <li key={index}>
                        <p>Stars: {review.stars}</p>
                        <p>Review: {review.text}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Reviews;
