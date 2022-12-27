import { createContext } from "react";

interface userContextType {
  userUid: string;
  username: string | undefined | null;
}

export const UserContext = createContext({} as userContextType);
