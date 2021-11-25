import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getReviews } from "../../utils/api";
import { getCategories } from "../../utils/api";
import CategoryDropdown from "../ReviewByCategory/CategoryDropdown";
// import { useContext } from "react";
// import { UserContext } from "../contexts/user";
import LoginForm from "../Login/LoginForm";

export default function Nav({ reviews, setReviews, category, setCategory }) {
  const [categories, setCategories] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [err, setErr] = useState(null);
  const navigate = useNavigate();
  //   const { currentUser } = useContext(UserContext);

  useEffect(() => {
    setLoading(true);
    getCategories()
      .then((categories) => {
        setLoading(false);
        setCategories(categories);
      })
      .catch((err) => {
        setLoading(false);
        setErr("Well this is embarrassing! Something has gone wrong!");
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

  if (isLoading) return <p className="Reviews">Be with you in a mo...</p>;
  if (err) return <p className="Reviews">{err}</p>;
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
