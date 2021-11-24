import { useState, useContext } from "react";
import { UserContext } from "../../contexts/user";

export default function Login() {
  const [username, setUsername] = useState("");

  // const { setUser } = useContext(UserContext);

  const handleSubmit = (e) => {
    // setUser({ username });
  };

  const Expandable = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleIsOpen = () => setIsOpen((prevIsOpen) => !prevIsOpen);

    return (
      <div>
        <button onClick={toggleIsOpen}>
          {isOpen ? "Close Login" : "LogIn"}
        </button>
        {isOpen && children}
      </div>
    );
  };

  return (
    <div className="Login">
      <Expandable>
        <form onSubmit={handleSubmit}>
          <label>
            Username:
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            ></input>
          </label>
          <button>Login</button>
        </form>
      </Expandable>
    </div>
  );
}
