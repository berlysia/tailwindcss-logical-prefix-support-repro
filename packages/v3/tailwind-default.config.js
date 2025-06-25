/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [],
  safelist: [
    'p-4', 'p-6', 'm-4', 'm-6',
    'mis-4', 'mis-6', 'mie-4', 'mie-6',
    'pie-4', 'pie-6', 'pis-4', 'pis-6',
    'ms-4', 'ms-6', 'me-4', 'me-6',
    'bg-blue-100', 'bg-green-100',
    'text-2xl', 'font-bold', 'mb-4', 'space-y-4', 'rounded'
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('tailwindcss-logical')
  ]
}