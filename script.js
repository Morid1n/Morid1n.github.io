const SYSTEM_THEME_QUERY = '(prefers-color-scheme: dark)';
const LANGUAGE_STORAGE_KEY = 'morid1n-language';

const translations = {
  en: {
    pageTitle: 'Morid1n — Websites',
    skipSites: 'Skip to websites',
    languageLabel: 'Language',
    githubAvatarLabel: "Open Morid1n's GitHub profile",
    githubAvatarAlt: "Morid1n's GitHub avatar",
    imagazineLogoAlt: 'iMagazine logo',
    infiniteDiariesLogoAlt: 'Infinite Diaries logo',
    instagramAvatarAlt: "Morid1n's Instagram avatar",
    mastodonLogoAlt: 'Mastodon logo',
    heroTitle: 'My life on the internet',
    heroLede: 'A small collection of live projects, archives, and experiments published on GitHub Pages.',
    liveSites: 'LIVE SITES',
    exploreCollection: 'Explore the collection',
    liveSitesNote: 'Two public sites are currently available under this domain.',
    live: 'Live',
    openSite: 'Open site',
    source: 'Source',
    nadgryzieniLogoAlt: 'Nadgryzieni logo',
    nadgryzieniDescription: 'An interactive archive of Nadgryzieni podcast episodes, with timelines, listening-time statistics, and searchable episode records.',
    subjectiveDescription: 'An early static-publishing experiment exploring alternatives to WordPress and lightweight blogging workflows.',
    otherProjects: 'OTHER PROJECTS',
    otherProjectsTitle: 'Other projects',
    otherProjectsNote: 'A few other places and projects worth exploring.',
    external: 'External',
    visitSite: 'Visit site',
    imagazineDescription: 'Technology, lifestyle, travel, and art.',
    infiniteDiariesDescription: 'Technology, photography, and travel.',
    instagramDescription: 'Wojciech Pietrusiewicz on Instagram.',
    podcastDescription: 'Nadgryzieni podcast episodes on Retro Rocket Network.',
    mastodonDescription: 'Morid1n on Mastodon.',
    published: 'Published on GitHub Pages.',
    githubProfile: 'GitHub profile',
    theme: {
      dark: 'Dark',
      light: 'Light',
      switchToDark: 'Switch to dark theme',
      switchToLight: 'Switch to light theme',
    },
  },
  pl: {
    pageTitle: 'Morid1n — Strony',
    skipSites: 'Przejdź do stron',
    languageLabel: 'Język',
    githubAvatarLabel: 'Otwórz profil Morid1n na GitHubie',
    githubAvatarAlt: 'Awatar Morid1n z GitHuba',
    imagazineLogoAlt: 'Logo iMagazine',
    infiniteDiariesLogoAlt: 'Logo Infinite Diaries',
    instagramAvatarAlt: 'Awatar Morid1n z Instagrama',
    mastodonLogoAlt: 'Logo Mastodona',
    heroTitle: 'Moje życie w internecie.',
    heroLede: 'Niewielki zbiór działających projektów, archiwów i eksperymentów opublikowanych w GitHub Pages.',
    liveSites: 'DZIAŁAJĄCE STRONY',
    exploreCollection: 'Przeglądaj kolekcję',
    liveSitesNote: 'Pod tą domeną są obecnie dostępne dwie publiczne strony.',
    live: 'Działa',
    openSite: 'Otwórz stronę',
    source: 'Kod źródłowy',
    nadgryzieniLogoAlt: 'Logo Nadgryzieni',
    nadgryzieniDescription: 'Interaktywne archiwum odcinków podcastu Nadgryzieni z osią czasu, statystykami czasu słuchania i wyszukiwaniem.',
    subjectiveDescription: 'Wczesny eksperyment z publikowaniem statycznym, badający alternatywy dla WordPressa i lekkie procesy blogowe.',
    otherProjects: 'INNE PROJEKTY',
    otherProjectsTitle: 'Inne projekty',
    otherProjectsNote: 'Kilka innych miejsc i projektów wartych odwiedzenia.',
    external: 'Zewnętrzny',
    visitSite: 'Odwiedź stronę',
    imagazineDescription: 'Technologia, lifestyle, podróże i sztuka.',
    infiniteDiariesDescription: 'Technologia, fotografia i podróże.',
    instagramDescription: 'Wojciech Pietrusiewicz na Instagramie.',
    podcastDescription: 'Odcinki podcastu Nadgryzieni w Retro Rocket Network.',
    mastodonDescription: 'Morid1n na Mastodonie.',
    published: 'Opublikowano na GitHub Pages.',
    githubProfile: 'Profil GitHub',
    theme: {
      dark: 'Ciemny',
      light: 'Jasny',
      switchToDark: 'Włącz ciemny motyw',
      switchToLight: 'Włącz jasny motyw',
    },
  },
};

const root = document.documentElement;
const themeToggle = document.querySelector('#theme-toggle');
const themeIcon = document.querySelector('#theme-toggle .theme-icon');
const themeLabel = document.querySelector('#theme-label');
const themeMeta = document.querySelector('meta[name="theme-color"]');
const languageButtons = [...document.querySelectorAll('[data-language-choice]')];
const systemThemeQuery = window.matchMedia(SYSTEM_THEME_QUERY);

let currentLanguage = 'en';

function getSystemTheme() {
  return systemThemeQuery.matches ? 'dark' : 'light';
}

function getStoredLanguage() {
  try {
    return localStorage.getItem(LANGUAGE_STORAGE_KEY) === 'pl' ? 'pl' : 'en';
  } catch (error) {
    return 'en';
  }
}

function setStoredLanguage(language) {
  try {
    localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
  } catch (error) {
    // Language switching still works for this visit when storage is unavailable.
  }
}

function updateThemeControl(theme) {
  const targetTheme = theme === 'dark' ? 'light' : 'dark';
  const strings = translations[currentLanguage].theme;

  if (themeToggle) {
    themeToggle.setAttribute('aria-pressed', String(theme === 'dark'));
    themeToggle.setAttribute(
      'aria-label',
      targetTheme === 'dark' ? strings.switchToDark : strings.switchToLight,
    );
  }
  if (themeIcon) {
    themeIcon.textContent = theme === 'dark' ? '☀' : '☾';
  }
  if (themeLabel) {
    themeLabel.textContent = strings[targetTheme];
  }
}

function applyTheme(theme) {
  root.dataset.theme = theme;
  updateThemeControl(theme);

  if (themeMeta) {
    themeMeta.setAttribute('content', theme === 'dark' ? '#1b1f1c' : '#f4f0e8');
  }
}

function applyLanguage(language) {
  currentLanguage = language === 'pl' ? 'pl' : 'en';
  const strings = translations[currentLanguage];
  root.dataset.lang = currentLanguage;
  root.lang = currentLanguage;
  document.title = strings.pageTitle;

  document.querySelectorAll('[data-i18n]').forEach((element) => {
    const key = element.dataset.i18n;
    if (strings[key]) {
      element.textContent = strings[key];
    }
  });

  document.querySelectorAll('[data-i18n-aria-label]').forEach((element) => {
    const key = element.dataset.i18nAriaLabel;
    if (strings[key]) {
      element.setAttribute('aria-label', strings[key]);
    }
  });

  document.querySelectorAll('[data-i18n-alt]').forEach((element) => {
    const key = element.dataset.i18nAlt;
    if (strings[key]) {
      element.setAttribute('alt', strings[key]);
    }
  });

  languageButtons.forEach((button) => {
    button.setAttribute('aria-pressed', String(button.dataset.languageChoice === currentLanguage));
  });

  updateThemeControl(root.dataset.theme || getSystemTheme());
}

applyLanguage(getStoredLanguage());
applyTheme(getSystemTheme());

themeToggle?.addEventListener('click', () => {
  applyTheme(root.dataset.theme === 'dark' ? 'light' : 'dark');
});

languageButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const language = button.dataset.languageChoice;
    setStoredLanguage(language);
    applyLanguage(language);
  });
});

function handleSystemThemeChange() {
  applyTheme(getSystemTheme());
}

if (typeof systemThemeQuery.addEventListener === 'function') {
  systemThemeQuery.addEventListener('change', handleSystemThemeChange);
} else if (typeof systemThemeQuery.addListener === 'function') {
  systemThemeQuery.addListener(handleSystemThemeChange);
}
