// * === TYPES ===

enum Theme {
  LIGHT = 'theme-light',
  DARK = 'theme-dark',
}

// * === ELEMENTS ===

const app = document.querySelector('.App') as Element;
const themeSwitcher = document.querySelector('.ThemeSwitcher') as Element;


useTheme(getPreferredTheme());
window.matchMedia?.('(prefers-color-scheme: dark)').addEventListener('change', event => {
  const theme = event.matches ? Theme.DARK : Theme.LIGHT;
  useTheme(theme);
});

themeSwitcher.addEventListener('click', () => {
  const isDark = app.classList.contains(Theme.DARK);
  const theme = isDark ? Theme.LIGHT : Theme.DARK;
  setPreferredTheme(theme);
  useTheme(theme);
});

//* === THEME ===

function useTheme(theme: Theme) {
  if (theme === Theme.DARK) {
    const darkTitle = 'Use dark theme';
    app.classList.remove(Theme.LIGHT);
    app.classList.add(Theme.DARK);
    themeSwitcher.setAttribute('title', darkTitle);
    themeSwitcher.setAttribute('aria-label', darkTitle);
  } else {
    const lightTitle = 'Use light theme';
    app.classList.remove(Theme.DARK);
    app.classList.add(Theme.LIGHT);
    themeSwitcher.setAttribute('title', lightTitle);
    themeSwitcher.setAttribute('aria-label', lightTitle);
  }
}

function getPreferredTheme(): Theme {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === Theme.LIGHT || savedTheme === Theme.DARK) {
    return savedTheme;
  }

  const isDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches;
  return isDark ? Theme.DARK : Theme.LIGHT;
}

function setPreferredTheme(theme: Theme): void {
  localStorage.setItem('theme', theme);
}
