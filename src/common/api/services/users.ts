import instance from "../axiosInstance";
import { AxiosError } from "axios";
import { ILoginUser, IResponseLoginUser, IServerResponseError } from "../types";

export const fetchData = async <T>(request: any): Promise<T> => {
  try {
    const response = await request;
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<IServerResponseError>;
    console.log(axiosError);
    throw new Error(
      axiosError?.message || "An error occurred while fetching the data"
    );
  }
};

export const fetchLogin = async (
  user: ILoginUser
): Promise<IResponseLoginUser> => {
  const request = instance.post("/User/login", user);
  return fetchData<IResponseLoginUser>(request);
};
