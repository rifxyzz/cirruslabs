import { Poppins } from "next/font/google";
import "./globals.css";
import Providers from "../components/Providers";
import Background from "../components/Background";
import Header from "../components/Header";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata = {
  title: "KERDOS",
  description: "Kerdos exchange and liquidity engine on Robinhood Chain.",
  icons: {
    icon: "/cirrus-logo.jpeg",
    shortcut: "/cirrus-logo.jpeg",
    apple: "/cirrus-logo.jpeg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <Providers>
          <Background />
          <Header />
          <main className="page-shell">{children}</main>
          <div className="tvl-dock">
            <span className="live-dot" />
            TVL $32,047
          </div>
          <a
            className="x-button"
            href="https://x.com/"
            target="_blank"
            rel="noreferrer"
            aria-label="KERDOS on X"
          >
            <svg className="icon" width="28" height="28" viewBox="0 0 24 24" fill="#fff">
              <path d="M18.244 2H21.5l-7.5 8.57L22.5 22h-6.59l-5.16-6.74L5.2 22H1.94l8.03-9.17L1.5 2h6.76l4.66 6.18L18.244 2zm-1.16 18h1.81L7.01 3.91H5.07L17.084 20z" />
            </svg>
          </a>
        </Providers>
      </body>
    </html>
  );
}