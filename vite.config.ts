import {resolve} from 'path';
import autoprefixer from 'autoprefixer';

export default {
  base: '',
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
      },
    },
  },
  server: {
    open: './index.html',
  },
  css: {
    postcss: {
      plugins: [
          autoprefixer,
      ],
    },
  },
};
