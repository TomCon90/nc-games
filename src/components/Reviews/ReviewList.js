import { useEffect } from "react";
import { Link } from "react-router-dom";
import { getReviews } from "../../utils/api";
import { useState } from "react";
import { getCategoriesByCategoryName } from "../../utils/api";

export default function ReviewList({ reviews, setReviews, category }) {
  const [isLoading, setLoading] = useState(true);
  const [err, setErr] = useState(null);
  const [categoryName, setCategoryName] = useState({
    description: "All Reviews below",
  });

  //Would like to take hooks in to a separate file with more time

  useEffect(() => {
    setLoading(true);
    getCategoriesByCategoryName(category)
      .then((categoryName) => {
        setLoading(false);
        setCategoryName(categoryName);
      })
      .catch((err) => {
        setLoading(false);
        setErr("Something has gone wrong!");
      });
  }, []);

  useEffect(() => {
    setLoading(true);
    getReviews()
      .then((reviews) => {
        setLoading(false);
        setReviews(reviews);
      })
      .catch((err) => {
        setLoading(false);
        setErr("Something has gone wrong!");
      });
  }, [setReviews]);

  // const capitalized = category.charAt(0).toUpperCase() + category.slice(1);

  //would like to conditionally render a description of the category below and use code above to capitalise the Title

  let match = category.length !== 0;
  if (isLoading) return <p>Loading...</p>;
  return (
    <main className="Reviews">
      <h2>Reviews</h2>
      {match ? (
        <>
          <h2>{category} Games</h2>
        </>
      ) : null}
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
