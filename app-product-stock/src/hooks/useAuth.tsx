import { ReactNode, createContext, useState } from "react";
import { api } from "../service/app";
import { toast } from "react-hot-toast";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

interface AuthProviderProps {
  children: ReactNode;
}

interface UserAuth {
  username: string;
  password: string;
}

interface User {
  username: string;
}

interface AuthState {
  accessToken: string;
  user: User;
}

interface AuthContenxtProps {
  data: AuthState;
  signin(data: UserAuth): Promise<void>;
  signout(): Promise<void>;
}

export const AuthContext = createContext({} as AuthContenxtProps);

export default function AuthContextProvider({ children }: AuthProviderProps) {
  const [data, setData] = useState<AuthState>(() => {
    const accessToken = localStorage.getItem("@token");
    const user = localStorage.getItem("@user");
    if (accessToken && user) {
      return {
        accessToken,
        user: JSON.parse(user),
      };
    }

    return {} as AuthState;
  });

  async function signin({ password, username }: UserAuth) {
    await api
      .post("auth/login", {
        username,
        password,
      })
      .then((response) => {
        const { accessToken, user } = response.data;

        localStorage.setItem("@token", accessToken);
        localStorage.setItem("@user", JSON.stringify(user));
        setData({ accessToken, user });
      })
      .catch((err) => {
        if (err instanceof AxiosError) {
          toast(err.response?.data.message, {
            icon: "❌",
          });
        }
      });
  }

  async function signout() {
    localStorage.clear();

    setData({} as AuthState);
  }

  return (
    <AuthContext.Provider value={{ data, signin, signout }}>
      {children}
    </AuthContext.Provider>
  );
}
