export const likedByLoggedUser = (post, user) =>
  post?.likes.likedBy.find((likeUser) => likeUser.username === user.username);
