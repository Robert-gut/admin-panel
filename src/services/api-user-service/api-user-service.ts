import axios, {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "../../../node_modules/axios/index";
import {
  IConfig,
  ITokens,
  IUser,
  IRegisterUser,
  ILogin,
  IChangePassword,
  IUpdateUser,
  IResponseBase,
  IGetAllUsersResponse,
  IUpdateProfile,
} from "../../common/interfaces/api-user-servise";

const instance: AxiosInstance = axios.create({
  //step URL
  baseURL: "https://10.7.201.111:5001/api/User",
  //home URL
  // baseURL: 'https://194.44.93.225:5001/api/User',

  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(
    (config: InternalAxiosRequestConfig<IConfig>): InternalAxiosRequestConfig<IConfig> => {
        const token = getAccessToken();
        if (token) {
            config.headers['Authorization'] = 'Bearer ' + token;
        }
        return config;
    },
    (error: AxiosError): Promise<AxiosError> => {
        return Promise.reject(error)
    }
);

instance.interceptors.response.use(
  (res: AxiosResponse): AxiosResponse => {
    return res;
  },
  async (err): Promise<AxiosError> => {
    // const error = err as AxiosError;
    const originalConfig = err.config;
    // Validation
    if (err.response?.status === 400 && err.response?.data) {
      return Promise.reject(err.response.data);
    }
    // Token
    if (
      err.response?.status === 401 &&
      !originalConfig._retry &&
      getAccessToken() != null
    ) {
      originalConfig._retry = true;
      try {
        const rs: AxiosResponse = await refreshAccessToken();
        const { accessToken, refreshToken }: ITokens = rs.data;
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
  }
);

async function refreshAccessToken(): Promise<AxiosResponse> {
  // return instance.post('/RefreshToken', {
  //     token: getAccessToken(),
  //     refreshToken: getRefreshToken(),
  // })

  const response = await instance.post("/RefreshToken", {
    token: getAccessToken(),
    refreshToken: getRefreshToken(),
  });
  return response;
}

// const responseBody: any = (response: any) => response.data;
const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
  get: <T>(url: string) => instance.get<T>(url).then().then(responseBody),
  post: <T>(url: string, body?: any) =>
    instance.post<T>(url, body).then().then(responseBody),
  put: (url: string, body?: any) =>
    instance.put(url, body).then().then(responseBody),
  patch: (url: string, body: any) =>
    instance.patch(url, body).then().then(responseBody),
  del: (url: string, body?: any) =>
    instance.delete(url, body).then().then(responseBody),
};
const User = {
    register: (user: IRegisterUser) => requests.post<IRegisterUser>('/register', user),
    login: (user: ILogin) => requests.post<ILogin>('/login', user),
    forgotPassword: (email: string) => requests.post('/ForgotPassword', email),
    getAllUsers: (start: number, end: number, isAll: boolean = false): Promise<IGetAllUsersResponse> => {
        return requests.get(
            '/GetAllUsers?start=' + start + '&end=' + end + '&isAll=' + isAll
        )
    },
    logout: (userId: string) => requests.get('/logout?userId=' + userId),
    changePassword: (user: IChangePassword) => requests.post('/ChangePassword', user),
    updateProfile: (user: IUpdateProfile) => requests.post('/updateProfile', user),
    updateUser: (user: IUpdateUser) => requests.post('/UpdateUser', user),
    deleteUser: (id: string) => requests.post('/DeleteUser', id)
}


export async function register(user: IRegisterUser): Promise<IResponseBase> {
  const data = await User.register(user)
    .then(response => {
      return {
        response,
      };
    })
    .catch(error => {
      return error.response;
    });
  return data;
}

export async function login(user: ILogin): Promise<IResponseBase> {
  const data = await User.login(user)
    .then(response => {
      return {
        response,
      };
    })
    .catch(error => {
      return error.response;
    });
  return data;
}

export async function forgotPassword(email: string): Promise<IResponseBase> {
  const data = await User.forgotPassword(email)
    .then(response => {
      return {
        response,
      };
    })
    .catch(error => {
      return error.response;
    });
  return data;
}

export async function getAllUsers (start: number, end: number, isAll = false): Promise<IGetAllUsersResponse> {
    const data = await User.getAllUsers(start, end, isAll)
        .then((response) => {
            return {
                response
            }
        })
        .catch((error) => {
            return error.response
        })
    return data;

}

export async function logout(userId: string): Promise<IResponseBase> {
  const data = await User.logout(userId)
    .then(response => {
      return {
        response,
      };
    })
    .catch(error => {
      return error.response;
    });
  return data;
}

export async function changePassword(
  user: IChangePassword
): Promise<IResponseBase> {
  const data = await User.changePassword(user)
    .then(response => {
      return {
        response,
      };
    })
    .catch(error => {
      return error.response;
    });
  return data;
}

export async function updateProfile(
  user: IUpdateProfile
): Promise<IResponseBase> {
  const data = await User.updateProfile(user)
    .then(response => {
      return {
        response,
      };
    })
    .catch(error => {
      return error.response;
    });
  return data;
}

export async function updateUser(user: IUpdateUser): Promise<IResponseBase> {
  const data = await User.updateUser(user)
    .then(response => {
      return {
        response,
      };
    })
    .catch(error => {
      return error.response;
    });
  return data;
}

export async function deleteUser(id: string): Promise<IResponseBase> {
  const data = await User.deleteUser(id)
    .then(response => {
      return {
        response,
      };
    })
    .catch(error => {
      return error.response;
    });
  return data;
}

// Token and user

export function setSelectedUser(user: IUser): void {
  const selectedUser = JSON.stringify(user);
  window.localStorage.setItem("selectedUser", selectedUser);
}
export function getSelectedUser(): IUser | null {
  let selectedUser: string | null = window.localStorage.getItem("selectedUser");
  return selectedUser ? JSON.parse(selectedUser) : null;
}

export function removeSelectedUser(): void {
  window.localStorage.removeItem("selectedUser");
}

// Token

export function setAccessToken(token: string): void {
  window.localStorage.setItem("accessToken", token);
}

export function setRefreshToken(token: string): void {
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

export function removeTokens(): void {
  window.localStorage.removeItem("accessToken");
  window.localStorage.removeItem("refreshToken");
  window.localStorage.removeItem("selectedUser");

  // другий варіант
  // window.localStorage.clear();
}