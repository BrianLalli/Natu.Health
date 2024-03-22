// pages/index.tsx
import React from 'react';
import RootLayout from '@/app/layout'; // Adjust according to your project structure
import Hero from '../components/hero'; // Adjust the import path
import SecondaryHero from '../components/secondaryHero'; // Adjust the import path
import Zigzag from '../components/zigzag';
import AboutUs from '../components/about-us'
// import OurApproach from '../components/our-approach';

export default function HomePage() {
  // Explicitly define the type of searchTerm as string
  const handleSearch = (searchTerm: string) => {
    console.log(`Search term: ${searchTerm}`);
    // Implement the search functionality here or call another function that handles searching
  };

  return (
    <RootLayout>
      <Hero />
      <AboutUs />
      <Zigzag />
      {/* <OurApproach /> */}
      <SecondaryHero />
    </RootLayout>
  );
}
