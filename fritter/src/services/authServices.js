import axios from "axios";

export const loginService = (loginInput) => {
  console.log("login service",loginInput);
  return axios.post("/api/auth/login", loginInput);
};

export const signUpService = (signUpInput) => {
  return axios.post("/api/auth/signup", signUpInput);
};
