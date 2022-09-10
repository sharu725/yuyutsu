import { derived, writable } from "svelte/store";
import { browser } from "$app/environment";

export const isSidebarOpen = writable(false);
export const isDark = writable(false);

export const changeTheme = (isDark) => {
  if (!browser) return;
  const tag = document.querySelector("html");
  tag.setAttribute("data-theme", isDark ? "dark" : "light");
};

export const themeChanger = derived(isDark, ($isDark) => changeTheme($isDark));
