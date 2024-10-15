import { useEffect, useRef, useState } from "react";

export const useTheme = <Theme>(themes: {
  dark: Theme;
  light: Theme;
}): Theme => {
  const matchesDark = useRef(window.matchMedia("(prefers-color-scheme: dark)"));
  const [theme, setTheme] = useState<keyof typeof themes>(
    matchesDark.current.matches ? "dark" : "light"
  );

  useEffect(() => {
    const listener = (e: { matches: boolean }) => {
      setTheme(e.matches ? "dark" : "light");
    };

    matchesDark.current.addEventListener("change", listener);

    return () => {
      matchesDark.current.removeEventListener("change", listener);
    };
  }, []);

  return themes[theme];
};
