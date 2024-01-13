export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section className="bg-black w-screen h-screen">{children}</section>;
}
