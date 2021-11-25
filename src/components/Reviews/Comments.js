import { useParams } from "react-router-dom";
import {
  getCommentsByReviewId,
  postComment,
  deleteComment,
  patchCommentVotes,
} from "../../utils/api";
import { useState, useEffect } from "react";
import { useContext } from "react";
import { UserContext } from "../../contexts/user";

export default function Comments() {
  const { review_id } = useParams();
  const [comments, setComments] = useState([]);
  const [addedVotes, setAddedVotes] = useState(0);
  const [decreasedVotes, setDecreasedVotes] = useState(0);
  const [isLoading, setLoading] = useState(true);
  const [err, setErr] = useState(null);
  const [isError, setIsError] = useState(false);
  const [downError, setDownError] = useState(false);
  const { currentUser } = useContext(UserContext);
  useEffect(() => {
    setLoading(true);
    getCommentsByReviewId(review_id)
      .then((comments) => {
        setLoading(false);
        setComments(comments);
      })
      .catch((err) => {
        setLoading(false);
        if (err.response.status === 404) {
          setErr("Dang! This review does not exist!");
        } else {
          setErr("Well this is embarrassing! Something has gone wrong!");
        }
      });
  }, [review_id]);

  //expanded section closes when changed. Would like to fix this.

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
  //work to do on errors here

  const handleClick = (e) => {
    e.preventDefault();
    const newComment = {
      body: e.target.form[0].value,
      votes: 0,
      username: currentUser.username,
    };
    if (newComment.body !== "") {
      setComments((prevComments) => {
        const array = [newComment, ...comments];
        return array;
      });
      postComment(review_id, newComment);
    }
  };

  //would like to add optimal rendering for delete
  //work to do on errors here

  const handleDelete = (comment_id) => {
    deleteComment(comment_id);
  };

  const handleVoteClick = (comment_id) => {
    setAddedVotes((prevVotes) => {
      return prevVotes + 1;
    });
    patchCommentVotes(comment_id, 1).catch(() => {
      setIsError(true);
      setAddedVotes((prevVotes) => {
        return prevVotes - 1;
      });
    });
  };

  const handleDownVoteClick = (comment_id) => {
    setDecreasedVotes((prevVotes) => {
      return prevVotes - 1;
    });
    patchCommentVotes(comment_id, -1).catch(() => {
      setIsError(true);
      setDecreasedVotes((prevVotes) => {
        return prevVotes + 1;
      });
    });
  };

  const isDisabled = addedVotes > 4;
  const downDisabled = decreasedVotes < -4;

  if (isLoading) return <p className="Reviews">Be with you in a mo...</p>;
  if (err) return <p className="Reviews">{err}</p>;
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
                <p>Votes: {comment.votes + addedVotes}</p>
                <button
                  onClick={() => {
                    handleVoteClick(comment.comment_id);
                  }}
                  className="VoteButton"
                  disabled={isDisabled}
                >
                  Upvote
                </button>
                {isError ? <p>Something went wrong!</p> : null}
                <button
                  onClick={() => {
                    handleDownVoteClick(comment.comment_id);
                  }}
                  className="VoteButton"
                  disabled={downDisabled}
                >
                  Downvote
                </button>
                {downError ? <p>Something went wrong!</p> : null}
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
