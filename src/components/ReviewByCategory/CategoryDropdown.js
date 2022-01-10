import { useNavigate } from "react-router-dom";
import { getReviewsByCategoryName, postCategory } from "../../utils/api";
import { useState } from "react";

export default function CategoryDropdown({
  categories,
  setReviews,
  setCategory,
}) {
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();

    const newCategory = {
      slug: e.target.form[0].value,
      description: e.target.form[1].value,
    };
    if (newCategory.description !== "" && newCategory.slug !== "") {
      setCategory((prevCategoriess) => {
        const array = [newCategory, ...categories];
        return array;
      });
      postCategory(newCategory);
    }
  };

  const Expandable = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleIsOpen = () => setIsOpen((prevIsOpen) => !prevIsOpen);

    return (
      <div>
        <button onClick={toggleIsOpen}>
          {isOpen ? "Close" : "Add a category"}
        </button>
        {isOpen && children}
      </div>
    );
  };

  const handleSelect = (event) => {
    event.preventDefault();
    console.log(event.target.value);
    if (event.target.value === "Add a New Category") {
      console.log("HERE I AM");
      return <p>TEST</p>;
    } else {
      setCategory(event.target.value);

      getReviewsByCategoryName(`?category=${event.target.value}`).then(
        (reviewsFromApi) => setReviews(reviewsFromApi)
      );

      navigate(`/reviews?category=${event.target.value}`);
    }
  };

  return (
    <div>
      <select
        className="NavSelector"
        onChange={handleSelect}
        value="Select Category"
      >
        <option defaultValue={true} disabled>
          Select Category
        </option>

        {categories.map((category) => {
          return (
            <option key={category.slug} value={category.slug}>
              {category.slug.charAt(0).toUpperCase() + category.slug.slice(1)}
            </option>
          );
        })}
        <option key="addyourown" value-="addyourown">
          Add a New Category
        </option>
      </select>
      <Expandable>
        <form className="PostComment">
          <p> Add a new category </p>
          <textarea
            type="text"
            name="slug"
            id="CategorySlug"
            placeholder="title"
            required={true}
          ></textarea>
          <textarea
            type="text"
            name="description"
            id="CategoryDescription"
            placeholder="description"
            required={true}
          ></textarea>
          <button type="submit" id="submit" onClick={handleClick}>
            ✔️
          </button>
        </form>
      </Expandable>
    </div>
  );
}
