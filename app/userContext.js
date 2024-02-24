import { createContext, useState } from "react";

export const UserContext = createContext();

export function User({ children }) {
  const [address, setAddress] = useState();
  const [isConnected, setIsConnected] = useState(false);
  const [balance, setBalance] = useState();

  return (
    <UserContext.Provider
      value={{
        address,
        setAddress,
        isConnected,
        setIsConnected,
        balance,
        setBalance,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
