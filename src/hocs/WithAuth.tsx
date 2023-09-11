import {
  useEffect,
  useState,
  ComponentType,
  FC,
  SetStateAction,
  Dispatch,
} from "react";
import { getAllUsers } from "../services/api-user-service/api-user-service.ts";

export interface AuthProps {
  isAuthenticated: boolean;
  setAuth?: Dispatch<SetStateAction<boolean>>;
}

export const withAuth = (WrappedComponent: ComponentType<AuthProps>) => {
  const WithAuth: FC<AuthProps> = (props) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      getAllUsers().then((response ) => {
      
        if (response?.response) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }

        setIsLoading(false);
      });
    }, []);

    return isLoading ? null : (
      <WrappedComponent
        {...props}
        setAuth={setIsAuthenticated}
        isAuthenticated={isAuthenticated}
      />
    );
  };

  return WithAuth;
};
