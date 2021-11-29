import { useState } from "react";
import { patchCommentVotes, deleteComment } from "../../utils/api";
import { useContext } from "react";
import { UserContext } from "../../contexts/user";

export default function CommentVoteHandler({ comment, comments, setComments }) {
  const [addedVotes, setAddedVotes] = useState(0);
  const [isError, setIsError] = useState(false);
  const { currentUser } = useContext(UserContext);

  const handleVoteClick = (comment_id) => {
    setAddedVotes((prevVotes) => {
      return prevVotes + 1;
    });
    patchCommentVotes(comment_id, 1).catch(() => {
      setIsError(true);
      setAddedVotes((prevVotes) => {
        return prevVotes - 1;
      });
    });
  };

  const handleDownVoteClick = (comment_id) => {
    setAddedVotes((prevVotes) => {
      return prevVotes - 1;
    });
    patchCommentVotes(comment_id, -1).catch(() => {
      setIsError(true);
      setAddedVotes((prevVotes) => {
        return prevVotes + 1;
      });
    });
  };

  //would like to add optimal rendering for delete
  //work to do on errors here

  const handleDelete = (comment_id) => {
    const nonDelete = comments.filter((comment) => {
      return comment.comment_id !== comment_id;
    });
    setComments(nonDelete);
    deleteComment(comment_id).catch(() => {
      setIsError(true);
      setComments(comments);
    });
  };

  const isDisabled =
    addedVotes !== 0 ||
    comment.votes + addedVotes < 1 ||
    currentUser.username === comment.author;
  let match = currentUser.username === comment.author;

  return (
    <li key={comment.created_at}>
      <h3>{comment.body}</h3>
      <p>Author: {comment.author}</p>
      <p>Votes: {comment.votes + addedVotes}</p>
      <button
        onClick={() => {
          handleVoteClick(comment.comment_id);
        }}
        className="VoteButton"
        disabled={isDisabled}
      >
        ❤️
      </button>
      <button
        onClick={() => {
          handleDownVoteClick(comment.comment_id);
        }}
        className="VoteButton"
        disabled={isDisabled}
      >
        👎
      </button>
      {isError ? <p>Something went wrong!</p> : null}
      {match ? (
        <button
          type="submit"
          onClick={() => {
            handleDelete(comment.comment_id);
          }}
        >
          🗑️
        </button>
      ) : null}
    </li>
  );
}
