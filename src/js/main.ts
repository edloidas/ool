// * === TYPES ===

enum Theme {
  LIGHT = 'theme-light',
  DARK = 'theme-dark',
}

// * === ELEMENTS ===

const app = document.querySelector('.App') as Element;
const themeSwitcher = document.querySelector('.ThemeSwitcher') as Element;


useTheme(getPreferedTheme());
window.matchMedia?.('(prefers-color-scheme: dark)').addEventListener('change', event => {
  const theme = event.matches ? Theme.DARK : Theme.LIGHT;
  useTheme(theme);
});

themeSwitcher.addEventListener('click', () => {
  const isDark = app.classList.contains(Theme.DARK);
  useTheme(isDark ? Theme.LIGHT : Theme.DARK);
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
  setPreferedTheme(theme);
}

function getPreferedTheme(): Theme {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === Theme.LIGHT || savedTheme === Theme.DARK) {
    return savedTheme;
  }

  const isDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches;
  return isDark ? Theme.DARK : Theme.LIGHT;
}

function setPreferedTheme(theme: Theme): void {
  localStorage.setItem('theme', theme);
}
