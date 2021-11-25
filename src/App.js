import "./App.css";
import Header from "./components/Header&Nav/Header";
import Nav from "./components/Header&Nav/Nav";
import ReviewList from "./components/Reviews/ReviewList";
import SingleReview from "./components/Reviews/SingleReview";
import UsersReviews from "./components/UsersReviews";
import Community from "./components/Community";
import { UserProvider } from "./contexts/user";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
// import LoginForm from "./components/Login/LoginForm";
// import { useContext } from "react";
// import { UserContext } from "./contexts/user";

// const RequireLogin = ({ children }) => {
//   const { isLoggedIn } = useContext(UserContext);
//   return isLoggedIn ? children : <LoginForm />;
// };

function App() {
  // const [currentUser, setCurrentUser] = useState({
  //   username: "jessjelly",
  //   avatar_url:
  //     "https://vignette.wikia.nocookie.net/mrmen/images/4/4f/MR_JELLY_4A.jpg/revision/latest?cb=20180104121141",
  //   name: "Jess Jelly",
  // });
  // const { user, setUser, isLoggedIn, logout } = useContext(UserContext);
  const [reviews, setReviews] = useState([]);
  const [category, setCategory] = useState([]);

  return (
    <UserProvider>
      <BrowserRouter>
        <div className="App">
          {/* <RequireLogin> */}
          <Nav
            reviews={reviews}
            setReviews={setReviews}
            setCategory={setCategory}
          />
          <Header />
          <Routes>
            <Route
              path="/"
              element={
                <ReviewList
                  reviews={reviews}
                  setReviews={setReviews}
                  category={category}
                />
              }
            />
            <Route
              path="/reviews"
              element={
                <ReviewList
                  reviews={reviews}
                  setReviews={setReviews}
                  category={category}
                />
              }
            />
            <Route path="/reviews/:review_id" element={<SingleReview />} />
            <Route path={"/users"} element={<Community />} />
            <Route
              path={"/users/:username"}
              element={<UsersReviews reviews={reviews} />}
            />
          </Routes>
          {/* </RequireLogin> */}
        </div>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
