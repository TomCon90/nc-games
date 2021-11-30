import { useNavigate } from "react-router-dom";
import { getSorted } from "../../utils/api";

export default function SortBy({ setReviews }) {
  const navigate = useNavigate();

  const handleSelect = (e) => {
    e.preventDefault();

    let path = `?sort_by=${e.target.value}`;

    getSorted(path).then((reviewsFromApi) => {
      setReviews(reviewsFromApi);
    });
    navigate(`/reviews?sort_by=${e.target.value}`);
  };

  return (
    <select className="NavSelector" onChange={handleSelect} value="SortBy">
      <option defaultValue={true} disabled>
        SortBy
      </option>
      <option key="Date" value="created_at">
        Most Recent
      </option>
      <option key="DateDown" value="created_at&order=ASC">
        Least Recent
      </option>
      <option key="Votes" value="votes">
        Votes: High to Low
      </option>
      <option key="VotesDown" value="votes&order=ASC">
        Votes: Low to High
      </option>
      <option key="Comments" value="comment_count">
        Comments: High to Low
      </option>
      <option key="CommentsDown" value="comment_count&order=ASC">
        Comments: Low to High
      </option>
    </select>
  );
}
