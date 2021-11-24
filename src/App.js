import "./App.css";
import Header from "./components/Header&Nav/Header";
import Nav from "./components/Header&Nav/Nav";
import ReviewList from "./components/Reviews/ReviewList";
import SingleReview from "./components/Reviews/SingleReview";
import ReviewsByCategory from "./components/ReviewByCategory/ReviewsByCategory";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginForm from "./components/Login/LoginForm";
import { useContext } from "react";
import { UserContext } from "./contexts/user";

// const RequireLogin = ({ children }) => {
//   const { isLoggedIn } = useContext(UserContext);
//   return isLoggedIn ? children : <LoginForm />;
// };

function App() {
  // const { user, setUser, isLoggedIn, logout } = useContext(UserContext);

  return (
    <BrowserRouter>
      <div className="App">
        {/* <RequireLogin> */}
        <Nav />
        <Header />
        <Routes>
          <Route path="/" element={<ReviewList />} />
          <Route path="/reviews" element={<ReviewList />} />
          <Route path="/reviews/:review_id" element={<SingleReview />} />
          <Route
            path="/reviews?category=category"
            element={<ReviewsByCategory />}
          />
        </Routes>
        {/* </RequireLogin> */}
      </div>
    </BrowserRouter>
  );
}

export default App;
