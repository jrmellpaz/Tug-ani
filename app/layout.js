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

export const metadata = {
	title: "Tug-ani",
	description: "Tug-ani is the official school publication of the University of the Philippines Cebu since its advent in 1974.",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body
				className={`${geistSans.variable} ${geistMono.variable} ${bebasNeue.variable} ${interRegular.variable} ${interBold.variable} ${interItalic.variable} antialiased`}
			>
				{children}
			</body>
		</html>
	);
}
