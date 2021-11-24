import { useParams } from "react-router-dom";
import {
  getCommentsByReviewId,
  postComment,
  deleteComment,
} from "../../utils/api";
import { useState, useEffect } from "react";

export default function Comments({ currentUser }) {
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
        <button onClick={toggleIsOpen}>
          {isOpen ? "Close Comments" : "View Comments"}
        </button>
        {isOpen && children}
      </div>
    );
  };

  //would like author to appear in optimal render, not just after post

  const handleClick = (e) => {
    e.preventDefault();
    const newComment = {
      body: e.target.form[0].value,
      votes: 0,
      author: currentUser.username,
    };
    if (newComment.body !== "") {
      setComments((prevComments) => {
        const array = [newComment, ...comments];
        return array;
      });
      postComment(review_id, newComment);
    }
  };

  //would like to add optimal renderind for delete

  const handleDelete = (comment_id) => {
    deleteComment(comment_id);
  };

  return (
    <div className="ReviewComments">
      <Expandable>
        <form>
          <legend>Please enter your details to set up a user account</legend>
          <p> Write a comment </p>
          <input
            type="text"
            name="comment"
            id="comment"
            placeholder="comment"
            required={true}
          ></input>
          <button type="submit" id="submit" onClick={handleClick}>
            Submit
          </button>
        </form>
        <ul className="CommentsList">
          {comments.map((comment) => {
            let match = currentUser.username === comment.author;

            return (
              <li key={comment.created_at}>
                <h3>{comment.body}</h3>
                <p>Author: {comment.author}</p>
                <p>Votes: {comment.votes}</p>
                <button>Upvote</button>
                <button>Downvote</button>
                {match ? (
                  <button
                    type="submit"
                    onClick={() => {
                      handleDelete(comment.comment_id);
                    }}
                  >
                    Delete
                  </button>
                ) : null}
              </li>
            );
          })}
        </ul>
      </Expandable>
    </div>
  );
}
