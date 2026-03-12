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
                    950: '#0f0a18',
                    900: '#150f24',
                    800: '#251840',
                },
                tambo: {
                    lavender: '#C9A0FF',
                    rose: '#FF7EB3',
                    blue: '#9B72CF',
                    purple: '#8B5CF6',
                    gold: '#F5D0A9',
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
                'shimmer': 'shimmer 8s linear infinite',
            },
            keyframes: {
                shimmer: {
                    '0%': { backgroundPosition: '-200% center' },
                    '100%': { backgroundPosition: '200% center' },
                },
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
