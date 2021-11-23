import axios from "axios";

const hallofgameApi = axios.create({
  baseURL: "https://tc-nc-games.herokuapp.com/api",
});

export const getCategories = () => {
  return hallofgameApi.get("/categories").then((res) => {
    return res.data.categories;
  });
};

export const getReviews = () => {
  return hallofgameApi.get("/reviews").then((res) => {
    return res.data.reviews;
  });
};

export const getReviewsByReviewId = (review_id) => {
  return hallofgameApi.get(`/reviews/${review_id}`).then((res) => {
    return res.data.review;
  });
};

export const getCommentsByReviewId = (review_id) => {
  return hallofgameApi.get(`/reviews/${review_id}/comments`).then((res) => {
    return res.data.comments;
  });
};

export const getReviewsByCategoryName = (category) => {
  return hallofgameApi.get("/reviews").then((res) => {
    const reviewArray = res.data.reviews;
    let matches = reviewArray.filter((review) => {
      return review.category === category;
    });
    return matches;
  });
};

export const getCategoriesByCategoryName = (category) => {
  return hallofgameApi.get("/categories").then((res) => {
    const categoriesArray = res.data.categories;
    let matches = categoriesArray.filter((cat) => {
      return cat.slug === category;
    });
    return matches[0];
  });
};
