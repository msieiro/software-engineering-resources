/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    daisyui: {
        base: true,
        styled: true,
        utils: true,
        themes: ['corporate', 'night']
    },
    plugins: [require('daisyui')]
}
