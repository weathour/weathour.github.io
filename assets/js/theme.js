const root = document.documentElement;
const savedTheme = localStorage.getItem("theme");
const preferredDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
const initialTheme = savedTheme || (preferredDark ? "dark" : "light");

root.dataset.theme = initialTheme;

document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("theme-toggle");
  if (!toggle) {
    return;
  }

  const syncLabel = () => {
    const isDark = root.dataset.theme === "dark";
    toggle.textContent = isDark ? "☀️" : "🌙";
    toggle.setAttribute("aria-label", isDark ? "切换到浅色主题" : "切换到深色主题");
  };

  syncLabel();

  toggle.addEventListener("click", () => {
    root.dataset.theme = root.dataset.theme === "dark" ? "light" : "dark";
    localStorage.setItem("theme", root.dataset.theme);
    syncLabel();
  });
});
