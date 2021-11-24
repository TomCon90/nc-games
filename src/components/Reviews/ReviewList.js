import { useEffect } from "react";
import { Link } from "react-router-dom";
import { getReviews } from "../../utils/api";
import { useState } from "react";
import { getCategoriesByCategoryName } from "../../utils/api";

export default function ReviewList({ reviews, setReviews, category }) {
  // const [categoryName, setCategoryName] = useState({
  //   description: "All Reviews below",
  // });

  //Would like to take hooks in to a separate file with more time

  // useEffect(() => {
  //   getCategoriesByCategoryName(category).then((categoryName) => {
  //     setCategoryName(categoryName);
  //     console.log(categoryName.description);
  //   });
  // }, []);

  useEffect(() => {
    getReviews().then((reviews) => {
      setReviews(reviews);
    });
  }, [setReviews]);

  // const capitalized = category.charAt(0).toUpperCase() + category.slice(1);

  return (
    <main className="Reviews">
      <h2>Reviews</h2>

      {/* <h2>{category} Games</h2>
      <p>{categoryName.description}</p> */}

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
