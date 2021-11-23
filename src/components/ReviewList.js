import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getReviews } from "../utils/api";

export default function ReviewList() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    getReviews().then((reviews) => {
      setReviews(reviews);
    });
  }, []);

  return (
    <main className="Reviews">
      <h2>Reviews</h2>
      <ul className="ReviewList">
        {reviews.map((review) => {
          return (
            <li className="ReviewSnapshot" key={review.review_id}>
              <Link to={`/reviews/${review.review_id}`}>
                <h3>{review.title}</h3>
              </Link>
              <p>Author: {review.owner}</p>
              <p>Votes: {review.votes}</p>
              <p>Comments: {review.comment_count}</p>
              <img
                className="HomeReviewImage"
                src={review.review_img_url}
                alt={review.title}
              />
            </li>
          );
        })}
      </ul>
    </main>
  );
}
