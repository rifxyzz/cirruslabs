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
  title: "Cirrus Labs",
  description: "Cirrus Labs exchange and liquidity engine on Robinhood Chain.",
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
        </Providers>
      </body>
    </html>
  );
}
