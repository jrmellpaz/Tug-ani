import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
	src: "./fonts/GeistVF.woff",
	variable: "--font-geist-sans",
	weight: "100 900",
});
const geistMono = localFont({
	src: "./fonts/GeistMonoVF.woff",
	variable: "--font-geist-mono",
	weight: "100 900",
});

const bebasNeue = localFont({
	src: "./fonts/BebasNeue-Regular.ttf",
	variable: "--font-bebas-neue",
});

const interRegular = localFont({
	src: "./fonts/Inter-Regular.ttf",
	variable: "--font-inter-regular",
});

const interBold = localFont({
	src: "./fonts/Inter-Bold.ttf",
	variable: "--font-inter-bold",
});

const interItalic = localFont({
	src: "./fonts/Inter-Italic.ttf",
	variable: "--font-inter-italic",
});

const openSansRegular = localFont({
	src: "./fonts/openSans-regular.ttf",
	variable: "--font-openSans-regular",
});

const openSansBold = localFont({
	src: "./fonts/openSans-bold.ttf",
	variable: "--font-openSans-bold",
});

const openSansItalic = localFont({
	src: "./fonts/openSans-italic.ttf",
	variable: "--font-openSans-italic",
});

const openSansBoldItalic = localFont({
	src: "./fonts/openSans-boldItalic.ttf",
	variable: "--font-openSans-boldItalic",
});

const gotham = localFont({
	src: "./fonts/gotham.otf",
	variable: "--font-gotham",
});

export const metadata = {
	title: {
		template: "%s - Tug-ani",
		default: "Tug-ani",
	},
	description: "Tug-ani is the official school publication of the University of the Philippines Cebu since its advent in 1974.",
	icons: {
		icon: [
			{
				media: "(prefers-color-scheme: dark)",
				url: "/icons/favicon.ico",
				href: "/icons/favicon.ico",
			},
			{
				media: "(prefers-color-scheme: light)",
				url: "/icons/icon.png",
				href: "/icons/icon.png",
			},
		],
	},
	keywords: [
		"Tug-ani",
		"UP",
		"UP Cebu",
		"University of the Philippines",
		"University of the Philippines Cebu",
		"publication",
		"school publication",
		"journalism",
		"news",
		"newspaper",
		"Cebu",
		"Philippines",
		"Visayas",
		"editorial board",
		"editorial"
	],
	applicationName: "Tug-ani",
	publisher: "Tug-ani",
	openGraph: {
		siteName: "Tug-ani",
		title: "Tug-ani",
		description: "The official school publication of the University of the Philippines Cebu since 1974",
		images: [
			{
				url: "https://firebasestorage.googleapis.com/v0/b/tug-ani.appspot.com/o/openGraph%2Fbanner.png?alt=media&token=94360740-faa8-45a4-be15-e24d6713adb5",
				alt: "Tug-ani banner",
				width: 3840,
				height: 2160,
			}
		]
	},
	twitter: {
		card: "summary_large_image",
		creator: "@upcebutugani",
		title: "Tug-ani — the official publication of UP Cebu",
		description: "The official school publication of the University of the Philippines Cebu since 1974",
		images: {
			url: "https://firebasestorage.googleapis.com/v0/b/tug-ani.appspot.com/o/openGraph%2Fbanner.png?alt=media&token=94360740-faa8-45a4-be15-e24d6713adb5",
			// url: "https://firebasestorage.googleapis.com/v0/b/tug-ani.appspot.com/o/openGraph%2Flogo.svg?alt=media&token=b637102e-6c85-493c-940b-35104fd8f06d",
			alt: "Tug-ani banner",
		},
	},
	category: "news",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			{/* <head>
				<link rel="icon" href="/icons/icon.png" sizes="any" />
				<link rel="manifest" href="public/icons/manifest.json" />
				<meta name="apple-mobile-web-app-title" content="Tug-ani"/>
			</head> */}
			<body
				className={`${geistSans.variable} ${geistMono.variable} ${bebasNeue.variable} ${interRegular.variable} ${interBold.variable} ${interItalic.variable} ${openSansRegular.variable} ${openSansBold.variable} ${openSansItalic.variable} ${openSansBoldItalic.variable} ${gotham.variable} antialiased box-border`}
			>
				{children}
			</body>
		</html>
	);
}
