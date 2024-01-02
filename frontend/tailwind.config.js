/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx, mdx}'],
  theme: {
    extend: {
      backgroundImage: {
        eingang: "url('public/images/eingang-opacity.jpg')",
      },
    },

    darkMode: 'class',
    color: {
      transparent: 'transparent',
      current: 'currentColor',
      black: '#000',
      white: '#fff',
      primary: {
        100: '#292928',
        200: '#4f4f4e',
      },
      secondary: {
        100: '#0a2d54',
        200: '#194a80',
      },
    },

    fontFamily: {
      title: ['Oswald', 'Ubuntu'],
      sans: ['Open Sans', 'ui-sans-serif', 'system-ui'],
      serif: ['Ubuntu', 'ui-serif', 'Georgia'],
      mono: ['Roboto Mono', 'ui-monospace', 'SFMono-Regular'],
      display: ['Oswald'],
      body: ['"Open Sans"'],
    },
  },
  plugins: [],
};
