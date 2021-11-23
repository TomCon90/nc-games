import { useParams } from "react-router-dom";
import {
  getReviewsByCategoryName,
  getCategoriesByCategoryName,
} from "../utils/api";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function ReviewsByCategory() {
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

  console.log(categoryName);
  const capitalised = category.charAt(0).toUpperCase() + category.slice(1);
  return (
    <main className="ReviewsByCategories">
      <h2>{capitalised} Games</h2>
      <p>{categoryName.description}</p>
      {reviews.map((review) => {
        return (
          <li key={review.review_id}>
            <Link key={review.review_id} to={`/reviews/${review.review_id}`}>
              {review.title}
            </Link>
          </li>
        );
      })}
    </main>
  );
}
