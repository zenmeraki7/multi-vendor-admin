export const logoutUser = () => {
    localStorage.removeItem("token"); // Remove token from localStorage
    window.location.reload(); // Refresh the page
  };
  