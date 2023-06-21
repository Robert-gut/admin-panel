import { ITokenRequest } from "../api/types";

export const getAuthTokens = (): ITokenRequest => {
  const tokensString = localStorage.getItem("tokens");
  return tokensString ? JSON.parse(tokensString) : {};
};
