import { useParams } from "react-router-dom";
import { getReviewsByReviewId, getCommentsByReviewId } from "../utils/api";
import { useState, useEffect } from "react";

export default function ReviewInfo() {
  const { review_id } = useParams();
  const [review, setReview] = useState({});
  const [comments, setComments] = useState([]);

  useEffect(() => {
    getReviewsByReviewId(review_id).then((review) => {
      setReview(review);
    });
  }, [review_id]);

  useEffect(() => {
    getCommentsByReviewId(review_id).then((comments) => {
      setComments(comments);
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
      <ul className="CommentsList">
        {comments.map((comment) => {
          return (
            <li key={comment.created_at}>
              <h3>{comment.body}</h3>
              <p>Author: {comment.author}</p>
              <p>Votes: {comment.votes}</p>
            </li>
          );
        })}
      </ul>
    </main>
  );
}
