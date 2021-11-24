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
    return res.data.reviews;
  });
};

//QUERY ATTEMPT
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

export const getReviewsbyUsername = (username) => {
  return hallofgameApi.get(`/reviews`).then((res) => {
    const reviewsArray = res.data.reviews;
    let matches = reviewsArray.filter((review) => {
      return review.owner === username;
    });
    return matches;
  });
};

export const getUserbyUsername = (username) => {
  return hallofgameApi.get(`/users/${username}`).then((res) => {
    return res.data;
  });
};

export const getCommentsbyUsername = (username) => {
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

export const postComment = (review_id, comment) => {
  return hallofgameApi
    .post(`/reviews/${review_id}/comments`, comment)
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
