//The layout for the checkout page

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section className="bg-slate-100">{children}</section>;
}
