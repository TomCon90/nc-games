import { useEffect, useState, useContext } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { getReviews, getCategories } from "../../utils/api";
import CategoryDropdown from "../ReviewByCategory/CategoryDropdown";
import { UserContext } from "../../contexts/user";
import LoginForm from "../Login/LoginForm";
import SortBy from "../Login/SortBy";

export default function Nav({ reviews, setReviews, category, setCategory }) {
  const [categories, setCategories] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [err, setErr] = useState(null);
  const navigate = useNavigate();
  const { currentUser } = useContext(UserContext);
  const pathname = window.location.pathname;
  let { search } = useLocation();
  let { review_id } = useParams();

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

  const handleHomeClick = () => {
    getReviews().then((reviewsFromApi) => {
      setReviews(reviewsFromApi);
    });
    navigate(`/`);
  };

  const handleCommunityClick = () => {
    navigate("/users");
  };

  let matchPath = pathname === "/" || pathname === "/reviews";
  let matchQuery = search.includes("category") || review_id;

  if (isLoading) return <p className="Reviews">Be with you in a mo...</p>;
  if (err) return <p className="Reviews">{err}</p>;
  return (
    <nav className="Nav">
      <button
        className="NavSelector"
        onClick={handleHomeClick}
        key="home"
        to="/"
      >
        Home
      </button>
      <button className="NavSelector" onClick={handleCommunityClick}>
        Community
      </button>
      <LoginForm />
      {matchQuery ? null : <SortBy setReviews={setReviews} />}
      {matchPath ? (
        <CategoryDropdown
          setReviews={setReviews}
          categories={categories}
          setCategory={setCategory}
          category={category}
        />
      ) : null}
      <div className="NavSelector">
        <p className="NavSelector"> User: {currentUser.username} </p>
        <img
          src={currentUser.avatar_url}
          alt={currentUser.username}
          className="userAvatarNav"
        />
      </div>
    </nav>
  );
}
