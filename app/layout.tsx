// Import your CSS and fonts as before
import './css/style.css';
import { Inter, Architects_Daughter } from 'next/font/google';

// Import your components
import Header from '@/components/ui/header';
// import Banner from '@/components/banner';
import Footer from '@/components/ui/footer';

// Initialize your fonts
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap'
});

const architects_daughter = Architects_Daughter({
  subsets: ['latin'],
  variable: '--font-architects-daughter',
  weight: '400',
  display: 'swap'
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className={`${inter.variable} ${architects_daughter.variable} font-inter antialiased bg-off-white text-dark-slate tracking-tight`}>
      <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
      <Header />
      {children}
      {/* <Banner /> */}
      <Footer />
    </div>
  );
}
