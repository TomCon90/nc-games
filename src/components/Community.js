import { useEffect, useState } from "react";
import { getAllUsers } from "../utils/api";
import { Link } from "react-router-dom";

export default function Community() {
  const [allUsers, setAllUsers] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  useEffect(() => {
    setLoading(true);
    getAllUsers()
      .then((users) => {
        setLoading(false);
        setAllUsers(users);
      })
      .catch((err) => {
        setLoading(false);
        setErr("Well this is embarrassing! Something has gone wrong!");
      });
  }, []);

  //want to link this to the specific details for each user.

  if (isLoading) return <p className="Reviews">Be with you in a mo...</p>;
  if (err) return <p className="Reviews">{err}</p>;
  return (
    <div className="Reviews">
      {allUsers.map((user) => {
        return (
          <Link to={`/users/${user.username}`}>
            <p>Member: {user.username}</p>
          </Link>
        );
      })}
    </div>
  );
}
