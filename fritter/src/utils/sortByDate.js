export const sortByDate = (posts, sortBy) => {
    if (sortBy === "Oldest") {
      return [...posts].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
    }
  
    if (sortBy === "Latest") {
      return [...posts].sort(
        (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
      );
    }
  
    if (sortBy === "Trending") {
      return [...posts].sort((a, b) => (a.likes.likeCount+a.comments.length) - (b.likes.likeCount+b.comments.length));
    }
  
    return posts;
  };
    