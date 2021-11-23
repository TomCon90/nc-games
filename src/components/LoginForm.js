import { useState, useEffect } from "react";
import { UserContext } from "../contexts/user";

export default function Login() {
  const [username, setUsername] = useState("");
  const { setUser } = useContext(UserContext);

  const handleSubmit = (e) => {
    //api call to check login details
    setUser({ username });
  };

  return (
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
  );
}
