/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                mystic: {
                    950: '#050508',
                    900: '#0a0a14',
                    800: '#1A1B4B',
                },
                tambo: {
                    lime: '#D4FF00',
                    cyan: '#00E5FF',
                    blue: '#00A3FF',
                    purple: '#7A3EBF',
                    gold: '#E9D758',
                }
            },
            fontFamily: {
                'display': ['Playfair Display', 'serif'],
                'body': ['Inter', 'system-ui', 'sans-serif'],
            },
            animation: {
                'fade-in': 'fadeIn 1s ease-out forwards',
                'fade-in-up': 'fadeInUp 1s ease-out forwards',
                'float': 'float 6s ease-in-out infinite',
                'orb-flow': 'orbFlow 20s linear infinite',
                'pulse-spirit': 'pulseSpirit 4s ease-in-out infinite',
                'spin-slow': 'spin 20s linear infinite',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                fadeInUp: {
                    '0%': { opacity: '0', transform: 'translateY(20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-20px)' },
                },
                orbFlow: {
                    '0%': { transform: 'rotate(0deg) translateX(100px) rotate(0deg)' },
                    '100%': { transform: 'rotate(360deg) translateX(100px) rotate(-360deg)' },
                },
                pulseSpirit: {
                    '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
                    '50%': { opacity: '0.7', transform: 'scale(1.1)' },
                }
            }
        },
    },
    plugins: [],
}
