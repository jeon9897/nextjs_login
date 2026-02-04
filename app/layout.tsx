import Header from './header/page';
import Footer from './footer/page';
import './css/reset.css';
import './css/common.css';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.0.1/css/all.min.css" />
      </head>

      <body>
        <Header />
          {children}
        <Footer />
      </body>
    </html>
  );
}
