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

export const getReviewsByCategoryName = (slug) => {
  return hallofgameApi.get("/reviews").then((res) => {
    const reviewArray = res.data.reviews;
    let matches = reviewArray.filter((review) => {
      console.log(review);
      return review.category === slug;
    });
    return matches;
  });
};
