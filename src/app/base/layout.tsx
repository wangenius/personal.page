
export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <div className="flex w-full max-w-7xl m-auto gap-5 justify-between">
      <main className="flex-1 min-w-0 py-8">{children}</main>
    </div>
  );
}
