import type { Config } from "tailwindcss"

const config: Config = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			colors: {
				primary: "#6300B3",
				"text-primary": "#303030",
				"text-secondary": "#5E6670",
				"text-muted": "#9199A3",
				"background-card": "#ffffff",
				"accent-success": "#0BA02C",
				"background-success": "#E7F6EA",
				"background-primary": "#F1E0FF",
				"background-muted": "#F7F7F7",
				"border-muted": "#F2F2F2",
			},
			boxShadow: {
				box: "rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;",
			},
			animation: {
				"up-down": "up-down 2s ease-in-out infinite alternate",
			},
			letterSpacing: {
				"1": "0em",
				"2": "0.025em",
				"3": "0.05em",
				"4": "0.1em",
			},
		},
	},
	plugins: [],
}
export default config
