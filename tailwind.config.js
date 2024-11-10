/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
	screen: {
		"mobile": "450px",
	},
  	extend: {
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			},
			"tugAni-black": "#171413",
			"tugAni-white": "#F2F0EE",
			"tugAni-red": "#5A051B",
  		},
  		fontFamily: {
  			bebas: ["var(--font-bebas-neue)"],
  			interRegular: ["var(--font-inter-regular)"],
  			interBold: ["var(--font-inter-bold)"],
  			interItalic: ["var(--font-inter-italic)"],
			openSansRegular: ["var(--font-openSans-regular)"],
			openSansBold: ["var(--font-openSans-bold)"],
			openSansItalic: ["var(--font-openSans-italic)"],
			openSansBoldItalic: ["var(--font-openSans-boldItalic)"],
			gotham: ["var(--font-gotham)"],
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [
	require("tailwindcss-animate"),
	require("daisyui"),
  ],
  daisyui: {
	darkTheme: "light",
	themes: [
		{
			light: {
				...require("daisyui/src/theming/themes")["light"],
				"background-color": "#F2F0EE",
				".checkbox": {
					"--chkbg": "#5A051B",
					"--chkfg": "#F2F0EE",
					"height": "1rem",
					"width": "1rem",
					"border-radius": "4px",
				}
			}
		}
	]
  }
};
