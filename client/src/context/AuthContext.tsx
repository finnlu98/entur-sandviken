import { useState, useEffect, createContext, useContext, useMemo, useCallback } from "react";
import apiClient from "../api/ApiClient";
import type { User } from "../model/User";
import type { Home } from "../model/Home";
import { useSearchParams } from "react-router-dom";

interface AuthContextProps {
  children: React.ReactNode;
}

type AuthState = {
  user: User | null;
  home: Home | null;
  loading: boolean;
  refresh: () => Promise<void>;
  login: (email: string) => Promise<void>;
  logout: () => Promise<void>;
  updatePersonalia: (user: Partial<User>, file: File | null) => Promise<void>;
  getHome: () => Promise<void>;
  createHome: () => Promise<void>;
  updateHome: (homeData: Partial<Home>, file: File | null) => Promise<void>;
  addHomeMember: (email: string) => Promise<User | null>;
  updateHomeMember: (email: string, data: Partial<User>, file: File | null) => Promise<User | null>;
  deleteHomeMember: (email: string) => Promise<void>;
};

const AuthContext = createContext<AuthState | undefined>(undefined);
const AuthProvider: React.FC<AuthContextProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [home, setHome] = useState<Home | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const getHome = useCallback(async () => {
    try {
      const res = await apiClient.get<{ home: Home }>("/auth/me/home");
      setHome(res.data.home);
    } catch (error) {
      console.error("Failed to fetch home data", error);
    }
  }, []);

  const refresh = useCallback(async () => {
    try {
      const res = await apiClient.get<{ user: User }>("/auth/me");
      const fetched = res.data.user;

      setUser(fetched);
      await getHome();
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, [getHome]);

  const createHome = async () => {
    try {
      const res = await apiClient.post<{ home: Home }>(
        "/auth/me/home",
        {},
        {
          meta: {
            loadingKey: "create-home",
          },
        },
      );
      setHome(res.data.home);
    } catch (error) {
      console.error("Failed to create home", error);
    }
  };

  const updateHome = async (homeData: Partial<Home>, file: File | null) => {
    if (!home) return;
    const formData = new FormData();
    if (homeData.name) formData.append("name", homeData.name);
    if (homeData.location) formData.append("location", JSON.stringify(homeData.location));
    if (file) formData.append("banner", file);
    try {
      const updatedHome = await apiClient.put<{ home: Home }>("/auth/me/home", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setHome(updatedHome.data.home);
    } catch (error) {
      console.error("Failed to update home", error);
    }
  };

  const addHomeMember = async (email: string): Promise<User | null> => {
    if (!home) return null;
    try {
      const res = await apiClient.post<{ user: User }>(
        `/auth/me/home/members`,
        { email },
        {
          meta: {
            loadingKey: `add-user-${email}`,
            successMessage: "Member added successfully",
            errorMessage: "Failed to add member",
          },
        },
      );
      setHome({ ...home, users: [...(home.users || []), res.data.user] });
      return res.data.user;
    } catch (error) {
      console.error("Failed to add home member", error);
      return null;
    }
  };

  const updateHomeMember = async (email: string, data: Partial<User>, file: File | null): Promise<User | null> => {
    if (!home) return null;

    const formData = new FormData();
    formData.append("email", email);
    if (data.name) formData.append("name", data.name);
    if (file) formData.append("avatar", file);

    try {
      const res = await apiClient.put<{ user: User }>(`/auth/me/home/member`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setHome({ ...home, users: home.users?.map((user) => (user.email === email ? res.data.user : user)) });
      return res.data.user;
    } catch (error) {
      console.error("Failed to update home member", error);
      return null;
    }
  };

  const deleteHomeMember = async (email: string): Promise<void> => {
    if (!home) return;
    try {
      await apiClient.delete(`/auth/me/home/members`, {
        data: { email },
        meta: {
          loadingKey: `delete-user-${email}`,
          successMessage: "Member removed successfully",
          errorMessage: "Failed to remove member",
        },
      });
      setHome({ ...home, users: home.users?.filter((user) => user.email !== email) });
    } catch (error) {
      console.error("Failed to delete home member", error);
    }
  };

  useEffect(() => {
    refresh();
  }, [refresh]);

  const logout = async () => {
    await apiClient.post(
      "/auth/logout",
      {},
      {
        meta: {
          loadingKey: "logout",
          successMessage: "Logged out successfully",
          errorMessage: "Logout failed",
        },
      },
    );
    setUser(null);
  };

  const login = async (email: string) => {
    await apiClient.post(
      "/auth/login",
      { email },
      {
        meta: {
          loadingKey: "login",
          successMessage: "Logged in successfully",
          errorMessage: "Login failed",
        },
      },
    );
    await refresh();
  };

  const consumeMagicLink = useCallback(
    async (magicLink: string) => {
      try {
        await apiClient.post(
          "/auth/magic/consume",
          { token: magicLink },
          {
            meta: {
              loadingKey: "consume-magic-link",
              successMessage: "Magic link consumed successfully",
              errorMessage: "Failed to consume magic link",
            },
          },
        );
        await refresh();
      } catch (error) {
        console.error("Failed to consume magic link", error);
      }
    },
    [refresh],
  );

  useEffect(() => {
    if (token) {
      consumeMagicLink(token);
      const url = new URL(window.location.href);
      url.search = "";
      window.history.replaceState({}, document.title, url.toString());
    }
  }, [token, consumeMagicLink]);

  const updatePersonalia = async (user: Partial<User>, file: File | null) => {
    if (!user) return;

    const formData = new FormData();
    if (user.email) formData.append("email", user.email);
    if (user.name) formData.append("name", user.name);
    if (file) formData.append("avatar", file);

    try {
      await apiClient.put<{ user: User }>("/auth/me/personalia", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      await refresh();
    } catch (error) {
      console.error("Failed to update personalia", error);
    }
  };

  const value = useMemo(
    () => ({
      user,
      home,
      loading,
      refresh,
      logout,
      login,
      updatePersonalia,
      getHome,
      createHome,
      updateHome,
      addHomeMember,
      updateHomeMember,
      deleteHomeMember,
    }),
    [user, home, loading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}

export default AuthProvider;
