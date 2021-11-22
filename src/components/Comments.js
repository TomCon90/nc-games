import { useParams } from "react-router-dom";
import { getCommentsByReviewId } from "../utils/api";
import { useState, useEffect } from "react";

export default function Comments() {
  const { review_id } = useParams();

  const [comments, setComments] = useState([]);

  useEffect(() => {
    getCommentsByReviewId(review_id).then((comments) => {
      setComments(comments);
    });
  }, [review_id]);
  return (
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
  );
}
