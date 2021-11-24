import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getReviews } from "../../utils/api";
import { getCategories } from "../../utils/api";
import CategoryDropdown from "../ReviewByCategory/CategoryDropdown";
// import { useContext } from "react";
// import { UserContext } from "../contexts/user";
import LoginForm from "../Login/LoginForm";
import Community from "../Community";

export default function Nav({ reviews, setReviews, category, setCategory }) {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  //   const { currentUser } = useContext(UserContext);

  useEffect(() => {
    getCategories().then((categories) => {
      setCategories(categories);
    });
  }, [reviews]);

  const handleClick = () => {
    getReviews().then((reviewsFromApi) => {
      setReviews(reviewsFromApi);
    });
    navigate(`/`);
  };

  const handleOtherClick = () => {
    navigate("/users");
  };

  return (
    <nav className="Nav">
      <button onClick={handleClick} key="home" to="/">
        Home
      </button>
      <button onClick={handleOtherClick}>Community</button>
      <LoginForm />
      <CategoryDropdown
        setReviews={setReviews}
        categories={categories}
        setCategory={setCategory}
        category={category}
      />
    </nav>
  );
}
