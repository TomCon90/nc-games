import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  getReviews,
  getCategoriesByCategoryName,
  postReview,
  getCategories,
  deleteReview,
} from "../../utils/api";
import { UserContext } from "../../contexts/user";
import { useContext } from "react";

export default function ReviewList({ reviews, setReviews, category }) {
  const [isLoading, setLoading] = useState(true);
  const { currentUser } = useContext(UserContext);
  const [err, setErr] = useState(null);
  const [categories, setCategories] = useState([]);
  const [isError, setIsError] = useState(false);
  const [page, setPage] = useState(0);
  const [categoryName, setCategoryName] = useState({
    slug: "All",
    description: "All the reviews you could ever want to see",
  });
  let { search } = useLocation();

  // Would like to take hooks in to a separate file with more time

  // issues resetting state for when user navigates back to home page. Description of last category remains.

  //code below sources the necessary details from back end.

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

  useEffect(() => {
    setLoading(true);

    getCategoriesByCategoryName(category)
      .then((category) => {
        setLoading(false);
        setCategoryName(category);
      })
      .catch((err) => {
        setLoading(false);
        if (err.status === 400) {
          setErr("Try again! This Category Doesn't Exist");
        } else {
          setErr("Well this is embarrassing! Something has gone wrong!");
        }
      });
  }, [category]);

  useEffect(() => {
    setLoading(true);
    getReviews()
      .then((reviews) => {
        console.log(reviews);
        setLoading(false);
        setReviews(reviews);
      })
      .catch((err) => {
        setLoading(false);
        setErr("Well this is embarrassing! Something has gone wrong!");
      });
  }, [setReviews]);

  //the code below covers the expandable comments section

  const Expandable = ({ children }) => {
    const [isOpen, setIsOpen] = useState(true);
    const toggleIsOpen = () => setIsOpen((prevIsOpen) => !prevIsOpen);

    return (
      <div>
        <button onClick={toggleIsOpen}>
          {isOpen ? "Close Comments" : "View Comments"}
        </button>
        {isOpen && children}
      </div>
    );
  };

  //the code below covers the posting of a new review - NOT WORKING

  const handleClick = (e) => {
    e.preventDefault();

    const newReview = {
      title: e.target.form[0].value,
      designer: e.target.form[1].value,
      review_body: e.target.form[2].value,
      category: e.target.form[3].value,
      owner: currentUser.username,
    };
    console.log(newReview);
    if (newReview.body !== "") {
      setReviews((prevReviews) => {
        const array = [newReview, ...reviews];

        return array;
      });

      postReview(newReview);
    }
  };

  //the code below handles deleting a review

  const handleDelete = (review_id) => {
    const nonDelete = reviews.filter((review) => {
      return review.review_id !== review_id;
    });
    setReviews(nonDelete);
    deleteReview(review_id).catch(() => {
      setIsError(true);
      setReviews(reviews);
    });
  };

  //would like to conditionally render a description of the category below

  let match = search.includes("?category") && category !== undefined;

  if (isLoading) return <p className="Reviews">Be with you in a mo...</p>;
  if (err) return <p className="Reviews">{err}</p>;
  return (
    <main className="Reviews">
      <h2>Which Games are HOT and which are .... NOT!</h2>
      {match ? (
        <>
          <h2 className="CategoryGames">{category} Games</h2>
          <h3>{categoryName?.description}</h3>
        </>
      ) : (
        <>
          <h2>All Games</h2>
          <h3>All the reviews you could ever want to see</h3>
        </>
      )}
      <ul className="ReviewList">
        {reviews.map((review) => {
          let matchUser = currentUser.username === review.owner;
          return (
            <li className="ReviewSnapshot" key={review.review_id}>
              <h3>{review.title}</h3>
              <img
                className="HomeReviewImage"
                src={review.review_img_url}
                alt={review.title}
              />
              <Link to={`/users/${review.owner}`}>
                <p>Author: {review.owner}</p>
              </Link>
              <p>Votes: {review.votes}</p>
              <p>Comments: {review.comment_count}</p>
              <Link to={`/reviews/${review.review_id}`}>
                <button>Read this review</button>
              </Link>

              {matchUser ? (
                <button
                  type="submit"
                  onClick={() => {
                    handleDelete(review.review_id);
                  }}
                >
                  🗑️
                </button>
              ) : null}
            </li>
          );
        })}
      </ul>

      <Expandable>
        <form className="PostReview">
          <p> Care to share your thoughts... </p>
          <textarea
            type="text"
            name="title"
            id="TitleBox"
            placeholder="title"
            required={true}
          ></textarea>
          <textarea
            type="text"
            name="designer"
            id="DesignerBox"
            placeholder="designer"
            required={true}
          ></textarea>
          <textarea
            type="text"
            name="body"
            id="BodyBox"
            placeholder="body"
            required={true}
          ></textarea>
          <select className="NavSelector" defaultValue="Select Category">
            <option defaultValue={true} disabled>
              Select Category
            </option>

            {categories.map((category) => {
              return (
                <option key={category.slug} defaultValue={category.slug}>
                  {category.slug.charAt(0).toUpperCase() +
                    category.slug.slice(1)}
                </option>
              );
            })}
          </select>
          <button type="submit" id="submit" onClick={handleClick}>
            ✔️
          </button>
        </form>
      </Expandable>

      <button
        onClick={() => {
          setPage((currentPage) => currentPage - 1);
        }}
        disabled={page === 0}
      >
        Previous Page
      </button>
      <button
        onClick={() => {
          setPage((currentPage) => currentPage + 1);
        }}
      >
        Next Page
      </button>
    </main>
  );
}
