import { useContext, createContext, type PropsWithChildren } from "react";
import { useStorageState } from "@/hooks/useStorageState";
import { fetchApi } from "@/api";
import * as SecureStore from "expo-secure-store";

const AuthContext = createContext<{
  signIn: ({}) => void;
  signOut: () => void;
  session?: string | null;
  isLoading: boolean;
  // token?: string | null;
}>({
  signIn: ({}) => null,
  signOut: () => null,
  session: null,
  isLoading: false,
  // token: null,
});

// This hook can be used to access the user info.
export function useSession() {
  const value = useContext(AuthContext);
  if (process.env.NODE_ENV !== "production") {
    if (!value) {
      throw new Error("useSession must be wrapped in a <SessionProvider />");
    }
  }

  return value;
}

export function SessionProvider({ children }: PropsWithChildren) {
  const [[isLoading, session], setSession] = useStorageState("session");

  return (
    <AuthContext.Provider
      value={{
        signIn: async (formState) => {
          // Perform sign-in logic here
          console.log("Login Data ---------", formState);
          const response = await fetchApi(`users`); // Call Auth api
          if (response) {
            // store token and user info into secure storage or mmkv
            setSession("xxx"); // set session string as you like
            // await SecureStore.setItemAsync("token", response.token); // set Token
          }
        },
        signOut: () => {
          setSession(null);
        },
        session,
        isLoading,
        // token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
