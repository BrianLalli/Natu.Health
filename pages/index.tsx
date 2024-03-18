import React from 'react';
import RootLayout from '@/app/layout'; // Adjust according to your project structure
import Hero from '../components/hero'; // Adjust the import path
import SecondaryHero from '../components/secondaryHero'; // Adjust the import path
import SearchBar from '../components/search-bar.client'; // Assuming you have a separate SearchBar, and it's not already part of Hero
import Zigzag from '../components/zigzag';
import AboutUs from '../components/about-us'
import OurApproach from '../components/our-approach';

export default function HomePage() {
  const handleSearch = (searchTerm: string) => {
    console.log(`Search term: ${searchTerm}`);
    // Implement the search functionality here or call another function that handles searching
  };

  return (
    // The background image is applied to RootLayout
    <RootLayout style={{ backgroundImage: "url('/images/abstract-blue-and-green-wave-glossy.png')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <Hero />
      <SearchBar onSearch={handleSearch} />
      <AboutUs />
      <Zigzag />
      <OurApproach />
      <SecondaryHero />
    </RootLayout>
  );
}
