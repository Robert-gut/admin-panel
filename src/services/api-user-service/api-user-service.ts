import axios from "../../../node_modules/axios/index";
import {
  getAccessToken,
  getRefreshToken,
  setAccessToken,
  setRefreshToken,
} from "../../common/utils/localStorageLogic.ts";

const instance = axios.create({
  //step URL
  baseURL: "https://10.7.201.111:5001/api/User",
  //home URL
//   baseURL: "https://194.44.93.225:5001/api/User",

  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(
  (config: any) => {
    const token = getAccessToken();
    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const originalConfig = err.config;
    // validation
    if (err.response.status === 400 && err.response.data) {
      return Promise.reject(err.response.data);
    }
    // Token
    if (
      err.response.status === 401 &&
      !originalConfig._retry &&
      getAccessToken() != null
    ) {
      originalConfig._retry = true;
      try {
        const rs = await refreshAccessToken();
        const { accessToken, refreshToken } = rs.data;
        setAccessToken(accessToken);
        setRefreshToken(refreshToken);
        instance.defaults.headers.common["Authorization"] =
          "Bearer " + accessToken;
        return instance(originalConfig);
      } catch (_error: any) {
        if (_error.response && _error.response.data) {
          return Promise.reject(_error.response.data);
        }
        return Promise.reject(_error);
      }
    }
    if (err.response.status === 403) {
      return Promise.reject(err.response.data);
    }
    if (err.response.status === 404) {
      if (axios.isAxiosError(err)) {
        return Promise.reject(err.response?.data);
      }
      return;
    }
    return Promise.reject(err);
  }
);

function refreshAccessToken() {
  return instance.post("/RefreshToken", {
    token: getAccessToken(),
    refreshToken: getRefreshToken(),
  });
}

const responseBody: any = (response: any) => response.data;

const requests = {
  get: (url: string) => instance.get(url).then().then(responseBody),
  post: (url: string, body?: any) =>
    instance.post(url, body).then().then(responseBody),
  put: (url: string, body?: any) =>
    instance.put(url, body).then().then(responseBody),
  patch: (url: string, body: any) =>
    instance.patch(url, body).then().then(responseBody),
  del: (url: string, body?: any) =>
    instance.delete(url, body).then().then(responseBody),
};

const User = {
  register: (user: any) => requests.post("/register", user),
  login: (user: any) => requests.post("/login", user),
  forgotPassword: (email: string) => requests.post("/ForgotPassword", email),
  getAllUsers: (start: number, end: number, isAll: boolean = false) => {
    return requests.get(
      "/GetAllUsers?start=" + start + "&end=" + end + "&isAll=" + isAll
    );
  },
  logout: (userId: string) => requests.get("/logout?userId=" + userId),
  changePassword: (user: any) => requests.post("/ChangePassword", user),
  updateProfile: (user: any) => requests.post("/updateProfile", user),
  updateUser: (user: any) => requests.post("/UpdateUser", user),
  deleteUser: (id: string) => requests.post("/DeleteUser", id),
};

export async function register(user: any) {
  const data = await User.register(user)
    .then((response) => {
      return {
        response,
      };
    })
    .catch((error) => {
      return error.response;
    });
  return data;
}

export async function login(user: any) {
  const data = await User.login(user)
    .then((response) => {
      return {
        response,
      };
    })
    .catch((error) => {
      return error.response;
    });
  return data;
}

export async function forgotPassword(email: string) {
  const data = await User.forgotPassword(email)
    .then((response) => {
      return {
        response,
      };
    })
    .catch((error) => {
      return error.response;
    });
  return data;
}

export async function getAllUsers(start: number, end: number, isAll: boolean) {
  const data = await User.getAllUsers(start, end, isAll)
    .then((response) => {
      return {
        response,
      };
    })
    .catch((error) => {
      return error.response;
    });
  return data;
}

export async function logout(userId: string) {
  const data = await User.logout(userId)
    .then((response) => {
      return {
        response,
      };
    })
    .catch((error) => {
      return error.response;
    });
  return data;
}

export async function changePassword(user: any) {
  const data = await User.changePassword(user)
    .then((response) => {
      return {
        response,
      };
    })
    .catch((error) => {
      return error.response;
    });
  return data;
}

export async function updateProfile(user: any) {
  const data = await User.updateProfile(user)
    .then((response) => {
      return {
        response,
      };
    })
    .catch((error) => {
      return error.response;
    });
  return data;
}

export async function updateUser(user: any) {
  const data = await User.updateUser(user)
    .then((response) => {
      return {
        response,
      };
    })
    .catch((error) => {
      return error.response;
    });
  return data;
}

export async function deleteUser(id: string) {
  const data = await User.deleteUser(id)
    .then((response) => {
      return {
        response,
      };
    })
    .catch((error) => {
      return error.response;
    });
  return data;
}

// Token and user
