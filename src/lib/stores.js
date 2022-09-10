import { derived, writable } from "svelte/store";
import { browser } from "$app/environment";

export const isSidebarOpen = writable(false);

export const theme = writable(browser && localStorage.yuyutsuTheme);
theme.subscribe((val) => browser && (localStorage.yuyutsuTheme = val));

export const changeTheme = (theme) => {
  if (!browser) return;
  const tag = document.querySelector("html");
  tag.setAttribute("data-theme", theme);
};

export const themeChanger = derived(theme, ($theme) => changeTheme($theme));
