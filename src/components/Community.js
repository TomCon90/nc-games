import { useEffect, useState } from "react";
import { getAllUsers } from "../utils/api";
import { Link } from "react-router-dom";

export default function Community() {
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    getAllUsers().then((users) => {
      setAllUsers(users);
    });
  }, []);

  //want to link this to the specific details for each user.

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
