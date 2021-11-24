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
  return hallofgameApi.get(`/reviews`).then((res) => {
    return res.data.reviews;
  });
};

//QUERY ATTEMPT
export const getReviewsByCategoryName = (path) => {
  console.log(path, "<<<inutil");
  return hallofgameApi.get(`/reviews${path}`).then((res) => {
    console.log(res.data.reviews, "FILTERED REVIEWS");
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

// export const getReviewsByCategoryName = (category) => {
//   return hallofgameApi.get(`/reviews?category=${category}`).then((res) => {
//     // const reviewArray = res.data.reviews;
//     // let matches = reviewArray.filter((review) => {
//     //   return review.category === category;
//     // });
//     // return matches;
//     console.log(res.data.reviews);
//     return res.data.reviews;
//   });
// };

export const getCategoriesByCategoryName = (category) => {
  return hallofgameApi.get("/categories").then((res) => {
    const categoriesArray = res.data.categories;
    let matches = categoriesArray.filter((cat) => {
      return cat.slug === category;
    });
    return matches[0];
  });
};

export const patchVotes = (review_id, increment) => {
  return hallofgameApi
    .patch(`/reviews/${review_id}`, { inc_votes: increment })
    .then((res) => {
      return res.data;
    });
};
