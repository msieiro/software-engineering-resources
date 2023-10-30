/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    daisyui: {
        themes: [
            {
                darktheme: {
                    primary: '#6576ce',
                    secondary: '#5e4dd1',
                    accent: '#e5ef8b',
                    neutral: '#322339',
                    'base-100': '#2b3954',
                    info: '#aab8e4',
                    success: '#1fb26b',
                    warning: '#d2a904',
                    error: '#df3b30'
                }
            }
        ]
    },
    plugins: [require('daisyui')]
}
