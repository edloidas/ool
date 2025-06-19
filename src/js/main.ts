// * === TYPES ===

type Theme = 'theme-light' | 'theme-dark';

// * === ELEMENTS ===

const app = document.querySelector('.App') as Element;
const themeSwitcher = document.querySelector('.ThemeSwitcher') as Element;

try {
  useTheme(getPreferredTheme());
} catch (error) {
  console.warn('Theme initialization failed:', error);
  useTheme('theme-light'); // fallback
}

window
  .matchMedia?.('(prefers-color-scheme: dark)')
  .addEventListener('change', (event) => {
    const theme = event.matches ? 'theme-dark' : 'theme-light';
    useTheme(theme);
  });

themeSwitcher.addEventListener('click', () => {
  const isDark = app.classList.contains('theme-dark');
  const theme = isDark ? 'theme-light' : 'theme-dark';
  setPreferredTheme(theme);
  useTheme(theme);
});

//* === THEME ===

function useTheme(theme: Theme) {
  if (theme === 'theme-dark') {
    const darkTitle = 'Use dark theme';
    app.classList.remove('theme-light');
    app.classList.add('theme-dark');
    themeSwitcher.setAttribute('title', darkTitle);
    themeSwitcher.setAttribute('aria-label', darkTitle);
  } else {
    const lightTitle = 'Use light theme';
    app.classList.remove('theme-dark');
    app.classList.add('theme-light');
    themeSwitcher.setAttribute('title', lightTitle);
    themeSwitcher.setAttribute('aria-label', lightTitle);
  }
}

function getPreferredTheme(): Theme {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'theme-light' || savedTheme === 'theme-dark') {
    return savedTheme;
  }

  const isDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches;
  return isDark ? 'theme-dark' : 'theme-light';
}

function setPreferredTheme(theme: Theme): void {
  localStorage.setItem('theme', theme);
}
