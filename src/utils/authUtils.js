export const logoutUser = () => {
  localStorage.removeItem("token");
  navigate("/login"); 
};
  