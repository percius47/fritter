export const getSearchedUser = (users, searchString) => {
    return users.filter(
      (user) =>
        user.username.toLowerCase().includes(searchString.toLowerCase()) ||
        user.fullName.toLowerCase().includes(searchString.toLowerCase())
    );
  };
   