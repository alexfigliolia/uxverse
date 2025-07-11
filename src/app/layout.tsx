import { Viewport } from "next";
import { Lexend } from "next/font/google";
import { classnames } from "@figliolia/classnames";
import { OptionalChildren } from "Types/React";
import "Styles/Reset.scss";

const londrinaShadow = Lexend({
  variable: "--font-lexend",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

export const viewport: Viewport = {
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 1,
  width: "device-width",
};

export default function RootLayout({ children }: OptionalChildren) {
  return (
    <html lang="en">
      <body
        className={classnames(
          londrinaShadow.variable,
          londrinaShadow.className,
        )}>
        {children}
      </body>
    </html>
  );
}
