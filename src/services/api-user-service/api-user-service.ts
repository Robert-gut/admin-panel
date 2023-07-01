import axios from "../../../node_modules/axios/index";

const instance = axios.create({
  // step URL
  baseURL: "https://10.7.201.111:5001/api/User",
  // home URL
  //   baseURL: "https://194.44.93.225:5001/swagger",

  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(
  (config: any) => {
    const token = getAccessToken();

    if (token) {
      config.headers["Authorization"] = "Bearer" + " " + token;
    }

    return config;
  },

  error => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  res => {
    return res;
  },

  async err => {
    const originalConfig = err.config;

    if (err.response.status === 400 && err.response.data) {
      return Promise.reject(err.response.data);
    }
    if (
      err.response.status === 401 &&
      !originalConfig._retry &&
      getAccessToken() !== null
    ) {
      // refresh
    }
    if (err.response.status === 403) {
      return Promise.reject(err.response?.data);
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

export async function register(user: any) {
  const data = await User.register(user)
    .then(response => {
      return response;
    })
    .catch(error => {
      return error.response;
    });
  return data;
}

export async function login(user: any) {
  const data = await User.login(user)
    .then(response => {
      return response;
    })
    .catch(error => {
      return error.response;
    });
  return data;
}

export async function forgotPassword(email: string) {
  const data = await User.fordotPassword(email)
    .then(response => {
      return response;
    })
    .catch(error => {
      return error.response;
    });
  return data;
}

export async function gerAllUser(start: number, end: number, isAll: boolean = false) {
  const data = await User.gerAllUser(user)
    .then(response => {
      return response;
    })
    .catch(error => {
      return error.response;
    });
  return data;
}