export default {
  Home: "/",
  Create: "/task/create",
  Signin: "/signin",
  Register: "/register",
  TaskDetails: id => `/task/${id || ":id"}`,
  EditTask: id => `/task/edit/${id || ":id"}`
};
