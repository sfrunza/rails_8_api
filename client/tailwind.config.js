/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        button:
          'rgba(100, 137, 139, 0) 0px 0px 0px 0px, rgba(100, 117, 139, 0) 0px 0px 0px 0px, rgba(100, 117, 139, 0.34) 0px 1px 1px 0px, rgba(226, 232, 240, 1) 0px 0px 0px 1px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(100, 117, 139, 0.08) 0px 2px 5px 0px',
        icon: '0 2px 3px 0 rgba(0,0,0,0.20)',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          1: 'hsl(var(--chart-1))',
          2: 'hsl(var(--chart-2))',
          3: 'hsl(var(--chart-3))',
          4: 'hsl(var(--chart-4))',
          5: 'hsl(var(--chart-5))',
        },
        // sidebar: {
        //   DEFAULT: 'hsl(var(--sidebar-background))',
        //   foreground: 'hsl(var(--sidebar-foreground))',
        //   primary: 'hsl(var(--sidebar-primary))',
        //   'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
        //   accent: 'hsl(var(--sidebar-accent))',
        //   'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
        //   border: 'hsl(var(--sidebar-border))',
        //   ring: 'hsl(var(--sidebar-ring))',
        // },
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
