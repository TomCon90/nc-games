import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { getReviews, getCategoriesByCategoryName } from "../../utils/api";

export default function ReviewList({ reviews, setReviews, category }) {
  const [isLoading, setLoading] = useState(true);
  const [err, setErr] = useState(null);
  const [categoryName, setCategoryName] = useState({
    slug: "All",
    description: "All the reviews you could ever want to see",
  });
  let { search } = useLocation();

  // Would like to take hooks in to a separate file with more time

  // issues resetting state for when user navigates back to home page. Description of last category remains.

  useEffect(() => {
    setLoading(true);

    getCategoriesByCategoryName(category)
      .then((category) => {
        setLoading(false);
        setCategoryName(category);
      })
      .catch((err) => {
        setLoading(false);
        if (err.status === 400) {
          setErr("Try again! This Category Doesn't Exist");
        } else {
          setErr("Well this is embarrassing! Something has gone wrong!");
        }
      });
  }, [category]);

  useEffect(() => {
    setLoading(true);
    getReviews()
      .then((reviews) => {
        setLoading(false);
        setReviews(reviews);
      })
      .catch((err) => {
        setLoading(false);
        setErr("Well this is embarrassing! Something has gone wrong!");
      });
  }, [setReviews]);

  //would like to conditionally render a description of the category below

  let match = search.includes("?category") && category !== undefined;

  if (isLoading) return <p className="Reviews">Be with you in a mo...</p>;
  if (err) return <p className="Reviews">{err}</p>;
  return (
    <main className="Reviews">
      <h2>Which Games are HOT and which are .... NOT!</h2>
      {match ? (
        <>
          <h2 className="CategoryGames">{category} Games</h2>
          <h3>{categoryName.description}</h3>
        </>
      ) : (
        <>
          <h2>All Games</h2>
          <h3>All the reviews you could ever want to see</h3>
        </>
      )}
      <ul className="ReviewList">
        {reviews.map((review) => {
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
