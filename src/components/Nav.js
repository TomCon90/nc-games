import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCategories } from "../utils/api";
import CategoryDropdown from "./CategoryDropdown";
import { useContext } from "react";
import { UserContext } from "../contexts/user";

export default function Nav() {
  const [categories, setCategories] = useState([]);
  //   const { currentUser } = useContext(UserContext);

  useEffect(() => {
    getCategories().then((categories) => {
      setCategories(categories);
    });
  }, []);

  return (
    <nav className="Nav">
      <Link key="home" to="/">
        Home
      </Link>
      <Link key="login" to="/">
        Login
      </Link>
      <CategoryDropdown categories={categories} />
    </nav>
  );
}
