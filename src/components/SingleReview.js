import { useParams } from "react-router-dom";
import { getReviewsByReviewId } from "../utils/api";
import { useState, useEffect } from "react";
import Comments from "./Comments";

export default function ReviewInfo() {
  const { review_id } = useParams();
  const [review, setReview] = useState({});
  const [comments, setComments] = useState([]);

  useEffect(() => {
    getReviewsByReviewId(review_id).then((review) => {
      setReview(review);
    });
  }, [review_id]);

  return (
    <main>
      <h1>{review.title}</h1>
      <p>Category: {review.category}</p>
      <p>{review.review_body}</p>
      <p>Votes: {review.votes}</p>
      <img
        className="GameImage"
        src={review.review_img_url}
        alt={review.title}
      />
      <Comments />
    </main>
  );
}
