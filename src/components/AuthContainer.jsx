import React, { createContext, useState, useEffect } from "react";
import { supabase } from "../supabase/connection";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [session, setSession] = useState(null);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    setSession(supabase.auth.getSession());
    supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
      setUserId(session?.user.id || "");
    });
  }, []);

  return (
    <AuthContext.Provider value={{ session, userId }}>
      {children}
    </AuthContext.Provider>
  );
};
