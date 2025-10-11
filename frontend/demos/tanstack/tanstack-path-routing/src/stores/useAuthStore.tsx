import { create } from "zustand";

/*
    isLoggedIn is global state managed by Zustand.
    Any component can read isLoggedIn without prop drilling.
    You can expand the store to include user info, tokens, roles, etc.
*/

interface AuthState {
  isLoggedIn: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: false,
  login: (username, password) => {
    if (username === "admin" && password === "admin") {
      set({ isLoggedIn: true });
      return true;
    }
    return false;
  },
  logout: () => set({ isLoggedIn: false }),
}));

export function isAuthenticated() {
  return useAuthStore.getState().isLoggedIn;
}

export default useAuthStore;
