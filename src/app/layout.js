import { Playfair_Display, Inter } from 'next/font/google';
import './globals.css';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata = {
  title: {
    default: 'Mustakeem Handsome Salon | Premium Men\'s Grooming \u0026 Luxury Services',
    template: '%s | Mustakeem Handsome Salon'
  },
  description: 'Experience the pinnacle of grooming at Mustakeem Handsome Salon. Luxury haircuts, beard styling, skincare, and bridal services in New Delhi.',
  keywords: ['salon', 'grooming', 'men\'s salon', 'luxury salon Delhi', 'bridal makeup', 'hair styling'],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <head>
        <meta name="theme-color" content="#fafaf5" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
