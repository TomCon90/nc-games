import { useNavigate, useLocation, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getReviewsByCategoryName } from "../../utils/api";

export default function CategoryDropdown({ categories }) {
  const navigate = useNavigate();

  const [reviews, setReviews] = useState([]);

  console.log(reviews, "REVIEWS IN STATE");

  //QUERY ATTEMPT
  const handleSelect = (e) => {
    e.preventDefault();
    let path = `?category=${e.target.value}`;
    getReviewsByCategoryName(path).then((reviews) => {
      setReviews(reviews);
    });
    navigate(`/reviews?category=${e.target.value}`);
  };

  // const category = useParams();
  // console.log(category, "<<<< category out of useeffect");
  // useEffect(() => {
  //   if (category !== undefined) {
  //     console.log(category, "<<<< CATEGORY");
  //     getReviewsByCategoryName(category).then((reviews) => {
  //       setReviews(reviews);
  //     });
  //   }
  // }, [category]);

  // const handleSelect = (e) => {
  //   e.preventDefault();
  //   navigate(`/reviews?category=${e.target.value}`);
  // };

  return (
    <select onChange={handleSelect} value="Select Category">
      <option selected={true} disabled>
        Select Category
      </option>
      {categories.map((category) => {
        return (
          <option key={category.slug} value={category.slug}>
            {category.slug.charAt(0).toUpperCase() + category.slug.slice(1)}
          </option>
        );
      })}
    </select>
  );
}
