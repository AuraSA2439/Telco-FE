"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { getProfile } from "@/services/auth";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  // Fetch profile on mount if token exists
  useEffect(() => {
    (async () => {
      try {
        const profile = await getProfile();
        setUser(profile);
      } catch {}
    })();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}