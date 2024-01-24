import { inter } from '@/app/ui/fonts';
import '@/app/ui/global.css';
import { Metadata } from 'next';

// 자동으로 이게 해당 페이지의 Metadata로 설정됨
export const metadata: Metadata = {
  // %s는 페이지에서 선언한 title로 대체됨
  title: { template: '%s | Acme Dashboard', default: 'Acme Dashboard' },
  description: 'The official Next.js Course Dashboard, built with App Router.',
  metadataBase: new URL('https://next-learn-dashboard.vercel.sh'),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
