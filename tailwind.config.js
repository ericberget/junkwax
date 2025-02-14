/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        slideUp: {
          '0%': { 
            opacity: '0',
            transform: 'translateY(20px)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)'
          }
        },
        slideDown: {
          '0%': {
            opacity: '0',
            transform: 'translateY(-20px)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)'
          }
        },
        scaleIn: {
          '0%': {
            opacity: '0',
            transform: 'scale(0.9)'
          },
          '100%': {
            opacity: '1',
            transform: 'scale(1)'
          }
        },
        popIn: {
          '0%': {
            opacity: '0',
            transform: 'scale(0.8)'
          },
          '40%': {
            opacity: '1',
            transform: 'scale(1.1)'
          },
          '100%': {
            transform: 'scale(1)'
          }
        },
        slideInRight: {
          '0%': {
            opacity: '0',
            transform: 'translateX(20px)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateX(0)'
          }
        },
        zoomReveal: {
          '0%': {
            opacity: '0.5',
            transform: 'scale(2.5)'
          },
          '100%': {
            opacity: '1',
            transform: 'scale(1)'
          }
        },
        checkmarkPop: {
          '0%': {
            opacity: '0',
            transform: 'scale(0) rotate(-45deg)'
          },
          '70%': {
            transform: 'scale(1.2) rotate(0deg)'
          },
          '100%': {
            opacity: '1',
            transform: 'scale(1) rotate(0deg)'
          }
        },
        revealCard: {
          '0%': {
            opacity: '0',
            transform: 'scale(0.95)'
          },
          '100%': {
            opacity: '1',
            transform: 'scale(1)'
          }
        }
      },
      animation: {
        fadeIn: 'fadeIn 0.5s ease-out',
        slideUp: 'slideUp 0.8s ease-out',
        slideDown: 'slideDown 0.8s ease-out',
        scaleIn: 'scaleIn 0.5s ease-out',
        popIn: 'popIn 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        slideInRight: 'slideInRight 0.5s ease-out',
        'slideUp-1': 'slideUp 0.8s ease-out 0.1s both',
        'slideUp-2': 'slideUp 0.8s ease-out 0.2s both',
        'slideUp-3': 'slideUp 0.8s ease-out 0.3s both',
        'slideUp-4': 'slideUp 0.8s ease-out 0.4s both',
        'zoomReveal': 'zoomReveal 1s cubic-bezier(0.16, 1, 0.3, 1)',
        'checkmarkPop': 'checkmarkPop 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'revealCard': 'revealCard 1.2s cubic-bezier(0.16, 1, 0.3, 1)'
      }
    },
  },
  plugins: [],
}