export function setSelectedUser(user: any) {
  user = JSON.stringify(user);
  window.localStorage.setItem("selectedUser", user);
}

export function getSelectedUser() {
  let selectedUser: any = window.localStorage.getItem("selectedUser");
  selectedUser = JSON.parse(selectedUser);
  return selectedUser;
}

export function removeSelectedUser() {
  window.localStorage.removeItem("selectedUser");
}

export function setAccessToken(token: string) {
  window.localStorage.setItem("accessToken", token);
}

export function setRefreshToken(token: string) {
  window.localStorage.setItem("refreshToken", token);
}

export function getAccessToken(): null | string {
  const accessToken = window.localStorage.getItem("accessToken");
  return accessToken;
}

export function getRefreshToken(): null | string {
  const refreshToken = window.localStorage.getItem("refreshToken");
  return refreshToken;
}

export function removeTokens() {
  window.localStorage.clear();
}
