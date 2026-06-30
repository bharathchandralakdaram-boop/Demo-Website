import React, { createContext, useContext, useState, useCallback, useEffect } from "react";

const RouterContext = createContext(null);

function parseLocation() {
  const hash = window.location.hash.replace(/^#/, "") || "/";
  const [path, query] = hash.split("?");
  const params = new URLSearchParams(query || "");
  return { path: path || "/", params };
}

export function RouterProvider({ children }) {
  const [loc, setLoc] = useState(parseLocation());

  useEffect(() => {
    const onHashChange = () => {
      setLoc(parseLocation());
      window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  const navigate = useCallback((path) => {
    window.location.hash = path;
  }, []);

  return (
    <RouterContext.Provider value={{ ...loc, navigate }}>{children}</RouterContext.Provider>
  );
}

export function useRouter() {
  const ctx = useContext(RouterContext);
  if (!ctx) throw new Error("useRouter must be used within RouterProvider");
  return ctx;
}
