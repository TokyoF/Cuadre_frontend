import React, { createContext, useEffect, useState } from "react";
import { useRouter, useSegments } from "expo-router";

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (
    identifier: string,
    password: string,
    rememberMe?: boolean,
  ) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  login: async () => {},
  signup: async () => {},
  logout: () => {},
});

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();
  const segments = useSegments();

  // Check for existing session on mount
  useEffect(() => {
    checkUserSession();
  }, []);

  // Handle routing based on authentication state
  useEffect(() => {
    const inAuthGroup = segments[0] === "(auth)";
    const inTabsGroup = segments[0] === "(tabs)";

    if (isAuthenticated && inAuthGroup) {
      // If user is authenticated but still in auth group, redirect to home
      router.replace("/(tabs)");
    } else if (!isAuthenticated && !inAuthGroup && segments[0] !== "") {
      // If user is not authenticated and not in auth group, redirect to login
      // Skip the redirect for the root route ('')
      router.replace("/login");
    }
  }, [isAuthenticated, segments]);

  const checkUserSession = async () => {
    try {
      // In a real app, check for stored credentials or tokens
      // For now, we'll just assume no existing session
      setIsAuthenticated(false);
      setUser(null);
    } catch (error) {
      console.error("Failed to restore authentication session", error);
    }
  };

  const login = async (
    identifier: string,
    password: string,
    rememberMe = false,
  ) => {
    try {
      // In a real app, make an API call to authenticate the user
      // For demo, we'll simulate a successful login with any credentials
      const mockUser = {
        id: "1",
        name: identifier.includes("@") ? identifier.split("@")[0] : identifier,
        email: identifier.includes("@")
          ? identifier
          : `${identifier}@example.com`,
      };

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Store credentials if rememberMe is true
      if (rememberMe) {
        // In a real app, this would securely store the token
        console.log("Storing credentials for future use");
      }

      setUser(mockUser);
      setIsAuthenticated(true);

      // Navigation will be handled by the useEffect that monitors isAuthenticated
    } catch (error) {
      console.error("Login failed", error);
      throw new Error("Authentication failed");
    }
  };

  const signup = async (name: string, email: string, password: string) => {
    try {
      // In a real app, make an API call to create an account
      // For demo, we'll simulate a successful signup
      const mockUser = {
        id: "1",
        name,
        email,
      };

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      console.log("User registered:", { name, email });

      // In a real app, you might either auto-login the user or redirect to login
      // For this demo, we'll just return the success
      return;
    } catch (error) {
      console.error("Signup failed", error);
      throw new Error("Registration failed");
    }
  };

  const logout = () => {
    // Clear user data and auth state
    setUser(null);
    setIsAuthenticated(false);

    // Navigate to login
    router.replace("/login");
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, login, signup, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}
