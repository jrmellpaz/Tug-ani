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
	title: "Tug-ani",
	description: "Tug-ani is the official school publication of the University of the Philippines Cebu since its advent in 1974.",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body
				className={`${geistSans.variable} ${geistMono.variable} ${bebasNeue.variable} ${interRegular.variable} ${interBold.variable} ${interItalic.variable} ${openSansRegular.variable} ${openSansBold.variable} ${openSansItalic.variable} ${openSansBoldItalic.variable} ${gotham.variable} antialiased box-border`}
			>
				{children}
			</body>
		</html>
	);
}
