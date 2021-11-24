import { useParams } from "react-router-dom";
import {
  getReviewsByCategoryName,
  getCategoriesByCategoryName,
} from "../../utils/api";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function ReviewsByCategory() {
  console.log("IN REVIEWS BY CATEGORY");

  const { category } = useParams();
  const [reviews, setReviews] = useState([]);
  const [categoryName, setCategoryName] = useState({});

  useEffect(() => {
    getReviewsByCategoryName(category).then((reviews) => {
      setReviews(reviews);
    });
  }, [category]);

  useEffect(() => {
    getCategoriesByCategoryName(category).then((categoryName) => {
      setCategoryName(categoryName);
    });
  }, [category]);

  const capitalized = category.charAt(0).toUpperCase() + category.slice(1);

  return (
    <main className="Reviews">
      <h2>{capitalized} Games</h2>
      <p>{categoryName.description}</p>
      <ul className="ReviewList">
        {reviews.map((review) => {
          return (
            <li className="ReviewSnapshot" key={review.review_id}>
              <Link key={review.review_id} to={`/reviews/${review.review_id}`}>
                {review.title}
              </Link>
              <p>Author: {review.owner}</p>
              <p>Votes: {review.votes}</p>
              <p>Comments: {review.comment_count}</p>
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
