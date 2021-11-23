import { Link, useNavigate } from "react-router-dom";

export default function CategoryDropdown({ categories }) {
  const navigate = useNavigate();

  const handleSelect = (e) => {
    e.preventDefault();
    navigate(`/${e.target.value}`);
  };

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
