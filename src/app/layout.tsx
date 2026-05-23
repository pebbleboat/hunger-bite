import type { Metadata } from "next";
import "@/styles/globals.css";
import ReactQueryClientProvider from "../components/ReactQueryClientProvider";
import ToastProvider from "../components/ToastProvider";

export const metadata: Metadata = {
  title: "HungerBite",
  description: "Order food from your favorite outlets",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ReactQueryClientProvider>
          <ToastProvider />
          {children}
        </ReactQueryClientProvider>
      </body>
    </html>
  );
}
