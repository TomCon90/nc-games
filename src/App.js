import "./App.css";
import Header from "./components/Header";
import Nav from "./components/Nav";
import ReviewList from "./components/ReviewList";
import SingleReview from "./components/SingleReview";
import ReviewsByCategory from "./components/ReviewsByCategory";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Nav />
        <Header />
        <Routes>
          <Route path="/" element={<ReviewList />} />
          <Route path="/reviews" element={<ReviewList />} />
          <Route path="/reviews/:review_id" element={<SingleReview />} />
          <Route path="/:category" element={<ReviewsByCategory />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
