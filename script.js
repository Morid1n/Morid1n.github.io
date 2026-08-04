const SYSTEM_THEME_QUERY = '(prefers-color-scheme: dark)';
const THEME_STORAGE_KEY = 'morid1n-theme-mode';
const THEME_MODES = new Set(['system', 'light', 'dark']);

const themeButtons = [...document.querySelectorAll('[data-theme-choice]')];
const themeMeta = document.querySelector('meta[name="theme-color"]');
const systemThemeQuery = window.matchMedia(SYSTEM_THEME_QUERY);

function getSystemTheme() {
  return systemThemeQuery.matches ? 'dark' : 'light';
}

function getStoredMode() {
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    return THEME_MODES.has(stored) ? stored : 'system';
  } catch (error) {
    return 'system';
  }
}

function setStoredMode(mode) {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, mode);
  } catch (error) {
    // Theme switching still works for this visit when storage is unavailable.
  }
}

function applyTheme(mode) {
  const theme = mode === 'system' ? getSystemTheme() : mode;
  document.documentElement.dataset.theme = theme;
  document.documentElement.dataset.themeMode = mode;

  themeButtons.forEach((button) => {
    button.setAttribute('aria-pressed', String(button.dataset.themeChoice === mode));
  });

  if (themeMeta) {
    themeMeta.setAttribute('content', theme === 'dark' ? '#1b1f1c' : '#f4f0e8');
  }
}

let themeMode = getStoredMode();
applyTheme(themeMode);

themeButtons.forEach((button) => {
  button.addEventListener('click', () => {
    themeMode = button.dataset.themeChoice;
    setStoredMode(themeMode);
    applyTheme(themeMode);
  });
});

function handleSystemThemeChange() {
  if (themeMode === 'system') {
    applyTheme(themeMode);
  }
}

if (typeof systemThemeQuery.addEventListener === 'function') {
  systemThemeQuery.addEventListener('change', handleSystemThemeChange);
} else if (typeof systemThemeQuery.addListener === 'function') {
  systemThemeQuery.addListener(handleSystemThemeChange);
}
