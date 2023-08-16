/** @type {import('tailwindcss').Config} */
export const content = ["./src/**/*.{html,js,jsx}"
  ,
  "./public/assets/**/*.{woff,woff2,ttf}",
];
export const mode = 'jit';
export const theme = {
  extend: {
    fontFamily: {
      'custom': ['RemachineScript', 'cursive', 'normal', 'normal'],

    },
    colors: {
      'dark-blue': '#2A2F4F',
      'dark-blue-2': '#917FB3',
      'custome-color': 'rgb(224, 239, 244)'
    },
    clipPath: {
      polygon: 'polygon()',
    },
  },
};