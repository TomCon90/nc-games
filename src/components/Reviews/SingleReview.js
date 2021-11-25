import { useParams } from "react-router-dom";
import { getReviewsByReviewId, patchVotes } from "../../utils/api";
import { useState, useEffect } from "react";
import Comments from "./Comments";

export default function ReviewInfo({ currentUser }) {
  const { review_id } = useParams();
  const [review, setReview] = useState({});
  const [addedVotes, setAddedVotes] = useState(0);
  const [decreasedVotes, setDecreasedVotes] = useState(0);
  const [isError, setIsError] = useState(false);
  const [downError, setDownError] = useState(false);

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
    setDecreasedVotes((prevVotes) => {
      return prevVotes - 1;
    });
    patchVotes(review_id, -1).catch(() => {
      setDownError(true);
      setDecreasedVotes((prevVotes) => {
        return prevVotes + 1;
      });
    });
  };
  console.log(review);
  const isDisabled = addedVotes > 4 || currentUser === review.owner;
  const downDisabled = decreasedVotes < -4 || review.votes < 1;

  return (
    <main className="Reviews">
      <div className="ReviewCard">
        <h1>{review.title}</h1>
        <p>
          Category:
          {review.category}
        </p>
        <p>{review.review_body}</p>
        <p>Votes: {review.votes + addedVotes + decreasedVotes}</p>
        <button
          onClick={handleClick}
          className="VoteButton"
          disabled={isDisabled}
        >
          YES
        </button>
        {downError ? <p>Something went wrong!</p> : null}
        <button
          onClick={handleDownClick}
          className="VoteButton"
          disabled={downDisabled}
        >
          NO
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
