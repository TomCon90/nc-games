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

  const Expandable = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleIsOpen = () => setIsOpen((prevIsOpen) => !prevIsOpen);

    return (
      <div>
        <button onClick={toggleIsOpen}>{isOpen ? "Close" : "Open"}</button>
        {isOpen && children}
      </div>
    );
  };

  return (
    <div className="ReviewComments">
      <Expandable>
        <ul className="CommentsList">
          {comments.map((comment) => {
            return (
              <li key={comment.created_at}>
                <h3>{comment.body}</h3>
                <p>Author: {comment.author}</p>
                <p>Votes: {comment.votes}</p>
                <button>Upvote</button>
                <button>Downvote</button>
              </li>
            );
          })}
        </ul>
      </Expandable>
    </div>
  );
}
