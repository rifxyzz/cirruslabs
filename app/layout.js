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
            TVL $3,200
          </div>
          <div className="social-dock">
            <a
              className="x-button"
              href="https://x.com/cirrusexchange"
              target="_blank"
              rel="noreferrer"
              aria-label="KERDOS on X"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#fff">
                <path d="M18.244 2H21.5l-7.5 8.57L22.5 22h-6.59l-5.16-6.74L5.2 22H1.94l8.03-9.17L1.5 2h6.76l4.66 6.18L18.244 2zm-1.16 18h1.81L7.01 3.91H5.07L17.084 20z" />
              </svg>
            </a>
            <a
              className="tg-btn"
              href="https://t.me/"
              target="_blank"
              rel="noreferrer"
              aria-label="KERDOS on Telegram"
            >
              <span className="sign">
                <svg viewBox="0 0 24 24">
                  <path d="M21.5 3.4 2.8 10.6c-1.3.5-1.3 1.2-.2 1.5l4.8 1.5 11.2-7.1c.5-.3 1-.1.6.2l-9 8.2-.3 4.8c.5 0 .7-.2 1-.5l2.4-2.3 5 3.7c.9.5 1.6.2 1.8-.9l3.3-15.4c.3-1.3-.5-1.9-1.4-1.5z" />
                </svg>
              </span>
              <span className="text">Telegram</span>
            </a>
          </div>
        </Providers>
      </body>
    </html>
  );
}