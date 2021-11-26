import { useNavigate } from "react-router-dom";
import { getReviewsByCategoryName } from "../../utils/api";

export default function CategoryDropdown({
  categories,
  setReviews,
  setCategory,
}) {
  const navigate = useNavigate();

  const handleSelect = (e) => {
    e.preventDefault();
    let path = `?category=${e.target.value}`;
    setCategory(e.target.value);
    getReviewsByCategoryName(path).then((reviewsFromApi) => {
      setReviews(reviewsFromApi);
    });
    navigate(`/reviews?category=${e.target.value}`);
  };

  return (
    <select
      className="NavSelector"
      onChange={handleSelect}
      value="Select Category"
    >
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
