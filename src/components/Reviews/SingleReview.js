import { useParams } from "react-router-dom";
import { getReviewsByReviewId, patchVotes } from "../../utils/api";
import { useState, useEffect, useContext } from "react";
import Comments from "./Comments";
import { UserContext } from "../../contexts/user";

export default function ReviewInfo() {
  const { review_id } = useParams();
  const [review, setReview] = useState({});
  const [addedVotes, setAddedVotes] = useState(0);
  const [isError, setIsError] = useState(false);
  const { currentUser } = useContext(UserContext);

  useEffect(() => {
    getReviewsByReviewId(review_id).then((review) => {
      setReview(review);
    });
  }, [review_id]);

  const handleClick = () => {
    setAddedVotes((prevVotes) => {
      return prevVotes + 1;
    });
    patchVotes(review_id, 1).catch(() => {
      setIsError(true);
      setAddedVotes((prevVotes) => {
        return prevVotes - 1;
      });
    });
  };

  const handleDownClick = () => {
    setAddedVotes((prevVotes) => {
      return prevVotes - 1;
    });
    patchVotes(review_id, -1).catch(() => {
      setIsError(true);
      setAddedVotes((prevVotes) => {
        return prevVotes + 1;
      });
    });
  };

  const isDisabled =
    addedVotes !== 0 ||
    review.votes + addedVotes < 1 ||
    currentUser.username === review.owner;

  //want to use the below card so the user is presented by a capitalized category name, however having issues with where this should live in state

  // const capitalized = review.category.charAt(0).toUpperCase() + review.category.slice(1);

  return (
    <main className="Reviews">
      <div className="ReviewCard">
        <h1>{review.title}</h1>
        <p>Category: {review.category}</p>
        <p>{review.review_body}</p>
        <p>Votes: {review.votes + addedVotes}</p>
        <p>Comments: {review.comment_count}</p>
        <button
          onClick={handleClick}
          className="VoteButton"
          disabled={isDisabled}
        >
          ❤️
        </button>
        <button
          onClick={handleDownClick}
          className="VoteButton"
          disabled={isDisabled}
        >
          👎
        </button>
        {isError ? <p>Something went wrong!</p> : null}
        <img
          className="GameImage"
          src={review.review_img_url}
          alt={review.title}
        />
      </div>

      <Comments currentUser={currentUser} review_id={review_id} />
    </main>
  );
}
