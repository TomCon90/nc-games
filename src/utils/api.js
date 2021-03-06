import axios from "axios";

const hallofgameApi = axios.create({
  baseURL: "https://tc-nc-games.herokuapp.com/api",
});

export const getCategories = () => {
  return hallofgameApi.get("/categories").then((res) => {
    return res.data.categories;
  });
};

export const getAllUsers = () => {
  return hallofgameApi.get("/users").then((res) => {
    return res.data;
  });
};

export const getReviews = () => {
  return hallofgameApi.get(`/reviews`).then((res) => {
    console.log(res.data, "res.data");
    return res.data.reviews;
  });
};

export const getReviewsByCategoryName = (path) => {
  return hallofgameApi.get(`/reviews${path}`).then((res) => {
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

export const getCategoriesByCategoryName = (category) => {
  if (category === undefined) {
    getCategories().then((res) => {
      return res.data.reviews;
    });
  } else {
    return hallofgameApi.get("/categories").then((res) => {
      const categoriesArray = res.data.categories;
      let matches = categoriesArray.filter((cat) => {
        return cat.slug === category;
      });
      return matches[0];
    });
  }
};

export const getReviewsByUsername = (username) => {
  return hallofgameApi.get(`/reviews`).then((res) => {
    const reviewsArray = res.data.reviews;
    let matches = reviewsArray.filter((review) => {
      return review.owner === username;
    });
    return matches;
  });
};

export const getUserByUsername = (username) => {
  return hallofgameApi.get(`/users/${username}`).then((res) => {
    return res.data;
  });
};

export const getCommentsByUsername = (username) => {
  return hallofgameApi.get(`/comments`).then((res) => {
    const commentsArray = res.data.comments;
    let matches = commentsArray.filter((comment) => {
      return comment.author === username;
    });
    return matches;
  });
};

export const patchVotes = (review_id, increment) => {
  return hallofgameApi
    .patch(`/reviews/${review_id}`, { inc_votes: increment })
    .then((res) => {
      return res.data;
    });
};

export const patchCommentVotes = (comment_id, increment) => {
  return hallofgameApi
    .patch(`/comments/${comment_id}`, { inc_votes: increment })
    .then((res) => {
      return res.data;
    });
};

export const postComment = (review_id, comment) => {
  // comment.author = comment.username;
  return hallofgameApi
    .post(`/reviews/${review_id}/comments`, comment)
    .then((res) => {
      return res.data;
    });
};

export const postReview = (review) => {
  console.log("HERE WE ARE");
  console.log(review);
  return hallofgameApi.post("/reviews", review).then((res) => {
    console.log("I AM HERE");
    return res.data;
  });
};

export const postCategory = (category) => {
  return hallofgameApi.post("/categories", category).then((res) => {
    return res.data;
  });
};

export const deleteReview = (review_id) => {
  return hallofgameApi
    .delete(`/reviews/${review_id}`, review_id)
    .then((res) => {
      return res.data;
    });
};

export const deleteComment = (comment_id) => {
  return hallofgameApi
    .delete(`/comments/${comment_id}`, comment_id)
    .then((res) => {
      return res.data;
    });
};

export const getSorted = (path) => {
  return hallofgameApi.get(`/reviews${path}`).then((res) => {
    return res.data.reviews;
  });
};
