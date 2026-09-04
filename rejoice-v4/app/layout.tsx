import "./globals.css";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Rejoice | Band App",
  description: "Interne bandomgeving van Rejoice",
};
export default function RootLayout({children}:{children:React.ReactNode}) {
  return <html lang="nl"><body>{children}</body></html>;
}
