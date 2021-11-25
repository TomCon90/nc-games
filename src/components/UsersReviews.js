import { useParams } from "react-router";
import { getReviewsbyUsername, getUserbyUsername } from "../utils/api";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function UsersReviews() {
  const { username } = useParams();
  const [userReviews, setUserReviews] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  const [user, setUser] = useState({});

  useEffect(() => {
    setLoading(true);
    getReviewsbyUsername(username)
      .then((reviews) => {
        setLoading(false);
        setUserReviews(reviews);
      })
      .catch((err) => {
        setLoading(false);
        if (err.response.status === 404) {
          setErr("Try again! This User Doesn't Exist");
        } else {
          setErr("Well this is embarrassing! Something has gone wrong!");
        }
      });
  }, [username]);

  useEffect(() => {
    setLoading(true);
    getUserbyUsername(username)
      .then((user) => {
        setLoading(false);
        setUser(user);
      })
      .catch((err) => {
        setLoading(false);
        if (err.response.status === 404) {
          setErr("Try again! This User Doesn't Exist");
        } else {
          setErr("Well this is embarrassing! Something has gone wrong!");
        }
      });
  }, [username]);

  if (isLoading) return <p className="Reviews">Be with you in a mo...</p>;
  if (err) return <p className="Reviews">{err}</p>;
  return (
    <main className="Reviews">
      <div>
        <h2>{user.username}</h2>
        <img className="userAvatar" src={user.avatar_url} alt={user.username} />
      </div>
      <h2>USER REVIEWS</h2>
      <ul className="ReviewList">
        {userReviews.map((review) => {
          return (
            <li className="ReviewSnapshot" key={review.review_id}>
              <h3>{review.title}</h3>
              <Link to={`/users/${review.owner}`}>
                <p>Author: {review.owner}</p>
              </Link>
              <p>Votes: {review.votes}</p>
              <p>Comments: {review.comment_count}</p>
              <Link to={`/reviews/${review.review_id}`}>
                <button>Read this review</button>
              </Link>
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
