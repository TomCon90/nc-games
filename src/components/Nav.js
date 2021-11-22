import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCategories } from "../utils/api";
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
      {categories.map((category) => {
        return (
          <Link key={category.slug} to={`/categories/${category.slug}`}>
            {category.slug}
          </Link>
        );
      })}
    </nav>
  );
}
