export default function CheckoutLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return <section className="bg-slate-100">{children}</section>;
}
