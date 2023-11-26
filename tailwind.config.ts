// import type {Config} from 'tailwindcss'

const config = {
    content: [
        './src/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors:{
                biscay: {
                    '50': '#eff7ff',
                    '100': '#dbecfe',
                    '200': '#bedeff',
                    '300': '#92cafe',
                    '400': '#5eadfc',
                    '500': '#388bf9',
                    '600': '#226cee',
                    '700': '#1a57db',
                    '800': '#1c46b1',
                    '900': '#1c3f8c',
                    '950': '#182b5c',
                },
            }
        },
    },
    plugins: [],
}
export default config
