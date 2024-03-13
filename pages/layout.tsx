// import { Inter, Architects_Daughter } from 'next/font/google'
// import Header from '@/components/ui/header'
// import Footer from '@/components/ui/footer'

// const inter = Inter({
//   subsets: ['latin'],
//   variable: '--font-inter',
//   display: 'swap'
// })

// const architects_daughter = Architects_Daughter({
//   subsets: ['latin'],
//   variable: '--font-architects-daughter',
//   weight: '400',
//   display: 'swap'
// })

// export default function RootLayout({ children }: { children: React.ReactNode }) {
//   return (
//     <div className={`flex flex-col min-h-screen overflow-hidden ${inter.variable} ${architects_daughter.variable} font-inter antialiased bg-gray-50 text-gray-800 tracking-tight`}>
//       {/* Header with a deep slate background */}
//       <Header className="bg-off-white text-dark-slate" />

//       {/* Main content */}
//       <main className="flex-grow">
//         {children}
//       </main>

//       {/* Footer with a light slate background */}
//       <Footer className="bg-light-slate text-gray-700" />
//     </div>
//   );
// }

import Header from '@/components/ui/header'
import Footer from '@/components/ui/footer'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen overflow-hidden font-inter antialiased bg-off-white text-gray-800 tracking-tight">
      {/* Header with a consistent background based on centralized color definitions */}
      <Header className="bg-off-white text-deep-slate" />

      {/* Main content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer with a consistent background based on centralized color definitions */}
      <Footer className="bg-light-slate text-gray-700" />
    </div>
  );
}



