/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [],
  prefix: 'tw-',
  safelist: [
    'tw-p-4', 'tw-p-6', 'tw-m-4', 'tw-m-6',
    'tw-mis-4', 'tw-mis-6', 'tw-mie-4', 'tw-mie-6',
    'tw-pie-4', 'tw-pie-6', 'tw-pis-4', 'tw-pis-6',
    'tw-ms-4', 'tw-ms-6', 'tw-me-4', 'tw-me-6',
    'tw-bg-blue-100', 'tw-bg-green-100',
    'tw-text-2xl', 'tw-font-bold', 'tw-mb-4', 'tw-space-y-4', 'tw-rounded'
  ],
  theme: {
    extend: {},
    spacing: {
      '4': '4px',
      '6': '6px'
    }
  },
  plugins: [
    require('tailwindcss-logical')
  ]
}