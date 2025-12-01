export const metadata = {
  title: "Shopping Site",
  description: "Atomic Design + Next.js",
};

export default function RootLayout({ children }) {
  return (
  <html lang="en">
    <body>{children}</body>
  </html>
  );
}