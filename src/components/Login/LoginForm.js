import { useState, useContext } from "react";
import { UserContext } from "../../contexts/user";
import { getUserByUsername } from "../../utils/api";

export default function Login() {
  const { setCurrentUser } = useContext(UserContext);
  const [err, setErr] = useState(null);
  const [isError, setIsError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    getUserByUsername(e.target.form[0].value)
      .then((user) => {
        setCurrentUser(user);
      })
      .catch((err) => {
        if (err.response.status === 404) {
          setIsError(true);
          setErr("This user does not exist!");
          return <p>This User doesn't exist</p>;
        } else {
          setErr("Well this is embarrassing! Something has gone wrong!");
        }
      });
  };

  const Expandable = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleIsOpen = () => setIsOpen((prevIsOpen) => !prevIsOpen);

    return (
      <div>
        <button onClick={toggleIsOpen}>
          {isOpen ? "Close" : "Change User"}
        </button>
        {isOpen && children}
      </div>
    );
  };

  // would like the option of logging in to remain after an incorrect user rater than only on the refresh

  if (err) return <p>{isError}</p>;
  return (
    <div className="NavSelector">
      <Expandable>
        <form>
          <label>
            Username:
            <input
              type="text"
              name="username"
              id="username"
              placeholder="username"
              required={true}
            ></input>
          </label>
          <button type="submit" id="submit" onClick={handleSubmit}>
            Change User
          </button>
        </form>
      </Expandable>
    </div>
  );
}
