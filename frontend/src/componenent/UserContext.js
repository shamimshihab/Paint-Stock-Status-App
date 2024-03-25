import { createContext, useState, useEffect } from "react";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [userInfo, setUserInfo] = useState(() => {
    const savedUserInfo = sessionStorage.getItem("userInfo");
    return savedUserInfo ? JSON.parse(savedUserInfo) : {};
  });

  useEffect(() => {
    sessionStorage.setItem("userInfo", JSON.stringify(userInfo));
  }, [userInfo]);

  return (
    <UserContext.Provider value={{ userInfo, setUserInfo }}>
      {children}
    </UserContext.Provider>
  );
}
