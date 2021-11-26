import { useContext } from "react";
import { UserContext } from "../../contexts/user";

export default function Header() {
  const { currentUser } = useContext(UserContext);

  const nameArr = currentUser.name.split(" ");
  const forename = nameArr[0];

  return (
    <div className="Header">
      <header className="App-header">
        <h1>Hall of Game</h1>
        <h3>The No1 place to get Board!</h3>
        <p>Welcome {forename}!</p>
      </header>
    </div>
  );
}
