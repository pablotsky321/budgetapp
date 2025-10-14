export interface AuthContextType {
    token: string | null;
    userId: string | null;
    isAuthenticated: boolean;
    login: (token: string,userId: string) => void;
    logout: () => void;
  }

  export interface LoginResponseType {
    message: string;
    token: string;
    user_id: string;
  }

  export interface LoginType {
    email: string;
    password: string;
  }

  export interface UserType {
    name: string;
    lastname: string;
    email: string;
    password: string;
  }
