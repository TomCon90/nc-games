import { useParams } from "react-router-dom";
import { getReviewsByCategoryName } from "../utils/api";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getReviews } from "../utils/api";

export default function ReviewsByCategory() {
  const { slug } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    getReviewsByCategoryName(slug).then((reviews) => {
      setReviews(reviews);
    });
  }, [slug]);

  return (
    <main className="ReviewsByCategories">
      {reviews.map((review) => {
        return (
          <Link key={review.review_id} to={`/reviews/${review.review_id}`}>
            {review.title}
          </Link>
        );
      })}
    </main>
  );
}
