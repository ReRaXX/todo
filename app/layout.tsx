import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Todo List',
  description: 'Task manager',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" >
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}