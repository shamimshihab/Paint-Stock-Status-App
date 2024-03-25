import { createContext, useState, useEffect } from "react";

// Creating a new context for user information
export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [userInfo, setUserInfo] = useState(() => {
    const savedUserInfo = sessionStorage.getItem("userInfo");
    return savedUserInfo ? JSON.parse(savedUserInfo) : {};
  });

  // update sessionStorage whenever userInfo changes
  useEffect(() => {
    sessionStorage.setItem("userInfo", JSON.stringify(userInfo));
  }, [userInfo]);

  return (
    <UserContext.Provider value={{ userInfo, setUserInfo }}>
      {children}
    </UserContext.Provider>
  );
}
