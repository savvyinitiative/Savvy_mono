import type { Config } from 'tailwindcss'

const defaultPalette = {
  primary: '#006838',
  secondary: '#231F20',
  accent: '#FBB040',
  background: '#FBFBFB',
  foreground: '#231F20',
  disabled: '#CCCACA',
  success: '#3c9e69',
  info: '#243a76',
  warning: '#b98e31',
  error: '#f44336',

  'dark-primary': '#0D769B',
  'dark-secondary': '#191919',
  'dark-accent': '#6387A6',
  'dark-background': '#191919',
  // "dark-background": "#1A284D",
  'dark-disabled': '#999999',
  'dark-success': '#3c9e69',
  'dark-info': '#243a76',
  'dark-warning': '#b98e31',
  'dark-error': '#f44336'
}

const palette: any = defaultPalette

const Color = require('color')

const lighten = (clr: any, val: any) =>
  Color(clr).mix(Color('white'), val).rgb().string()

const darken = (clr: any, val: any) =>
  Color(clr).mix(Color('black'), val).rgb().string()

const lightener = (clr: any, val: any) => Color(clr).lighten(val).rgb().string()

const darkener = (clr: any, val: any) => Color(clr).darken(val).rgb().string()

const generateContrasts = (variant: any, palette: any) => ({
  [variant]: palette,
  [`on-${variant}`]: Object.keys(palette).reduce(
    (enhancedPalette, shade) => ({
      ...enhancedPalette,
      [shade]: Color(palette[shade]).isLight() ? '#000000' : '#ffffff'
    }),
    {}
  )
})

const colorFinal = Object.keys(palette).reduce(
  (colors, variant) => ({
    ...colors,
    ...generateContrasts(variant, {
      DEFAULT: palette[variant],
      50: lightener(palette[variant], 0.9),
      100: lightener(palette[variant], 0.8),
      200: lightener(palette[variant], 0.6),
      300: lightener(palette[variant], 0.4),
      400: lightener(palette[variant], 0.2),
      500: palette[variant],
      600: darkener(palette[variant], 0.2),
      700: darkener(palette[variant], 0.4),
      800: darkener(palette[variant], 0.6),
      900: darkener(palette[variant], 0.8)
    })
  }),
  {}
)

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: colorFinal,
      // colors: {
      //   primary: '#1B3100',
      //   secondary: '#E9A90F',
      //   accent: '#F5F6F6',
      //   // You can add other colors here as well
      //   // For example, to define your own custom white and black:
      //   white: '#FFFFFF',
      //   black: '#000000',
      //   // Or, for a lighter gray:
      //   gray: '#CCCACA'
      // },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
      },
      animation: {
        scroll:
          'scroll var(--animation-duration, 40s) var(--animation-direction, forwards) linear infinite'
      },
      keyframes: {
        scroll: {
          to: {
            transform: 'translate(calc(-50% - 0.5rem))'
          }
        }
      }
    }
  },
  plugins: [
    require('@tailwindcss/typography'), 
  //  require('@tailwindcss/forms'),
  ]
}
export default config
