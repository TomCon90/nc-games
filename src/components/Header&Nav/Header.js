import { useContext } from "react";
import { UserContext } from "../../contexts/user";

export default function Header() {
  const { currentUser } = useContext(UserContext);

  return (
    <div className="Header">
      <header className="App-header">
        <h1>Hall of Game</h1>
        <p>Welcome, {currentUser.username}</p>
        <img
          src={currentUser.avatar_url}
          alt={currentUser.username}
          className="userAvatar"
        />
      </header>
    </div>
  );
}
