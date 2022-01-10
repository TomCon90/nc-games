import { useParams } from "react-router-dom";
import { getCommentsByReviewId, postComment } from "../../utils/api";
import { useState, useEffect } from "react";
import { useContext } from "react";
import { UserContext } from "../../contexts/user";
import CommentVoteHandler from "./CommentVoteHandler";

export default function Comments() {
  const { review_id } = useParams();
  const [comments, setComments] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [err, setErr] = useState(null);
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

  if (isLoading) return <p className="Reviews">Be with you in a mo...</p>;
  if (err) return <p className="Reviews">{err}</p>;
  return (
    <div className="ReviewComments">
      <Expandable>
        <form className="PostComment">
          <p> What's your view on this review... </p>
          <textarea
            type="text"
            name="comment"
            id="CommentBox"
            placeholder="comment"
            required={true}
          ></textarea>
          <button type="submit" id="submit" onClick={handleClick}>
            ✔️
          </button>
        </form>
        <ul className="CommentsList">
          {comments.map((comment) => {
            return (
              <section className="CommentCard">
                <CommentVoteHandler
                  comment={comment}
                  comments={comments}
                  setComments={setComments}
                />
              </section>
            );
          })}
        </ul>
      </Expandable>
    </div>
  );
}
