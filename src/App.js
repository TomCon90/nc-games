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

function App() {
  const [reviews, setReviews] = useState([]);
  const [category, setCategory] = useState([]);

  return (
    <UserProvider>
      <BrowserRouter>
        <div className="App">
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
        </div>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
