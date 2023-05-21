import React from "react";

const CommentPage = () => {
  const storedPostImage = localStorage.getItem("postImage");
  const storedComment = localStorage.getItem("comment");

  return (
    <div>
      <h1>Comment Page</h1>
      <img src={storedPostImage}  alt="Post" style={{ width: "500px", height: "500px" }} />
      <p>{storedComment}</p>
    </div>
  );
};

export default CommentPage;
