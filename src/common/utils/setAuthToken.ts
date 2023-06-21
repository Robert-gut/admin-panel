import { ITokenRequest } from "../api/types";

const setAuthToken = (tokens: ITokenRequest) => {
  if (tokens) {
    localStorage.tokens = JSON.stringify(tokens);
  } else {
    localStorage.removeItem("tokens");
  }
};

export default setAuthToken;
