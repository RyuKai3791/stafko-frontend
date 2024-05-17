import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: theme => ({
        'custom-image': "url('/path/to/your/image.jpg')",
      }),
      gridTemplateColumns: {
        '13': 'repeat(13, minmax(0, 1fr))',
      },
      colors: {
        blue: {
          400: '#2589FE',
          500: '#0070F3',
          600: '#2F6FEB',
        },
      },
    },
    keyframes: {
      shimmer: {
        '100%': {
          transform: 'translateX(100%)',
        },
      },
    },
  },
  variants: {},
  plugins: [require('@tailwindcss/forms')],
};

module.exports = {
  theme: {
    extend: {
      backgroundImage: (theme: any) => ({
        'custom-image': "url('/path/to/your/image.jpg')", // replace '/path/to/your/image.jpg' with your image path
      })
    }
  },
  variants: {},
  plugins: [],
}

export default config;
