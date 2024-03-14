// pages/index.tsx
import React from 'react';
import RootLayout from '@/app/layout'; // Adjust according to your project structure
import Header from '../components/ui/header'; // This might be already included in RootLayout
// import Footer from '../components/ui/footer'; // This might be already included in RootLayout
import Hero from '../components/hero'; // Adjust the import path
import SecondaryHero from '../components/secondaryHero'; // Adjust the import path
import SearchBar from '../components/search-bar.client'; // Assuming you have a separate SearchBar, and it's not already part of Hero
import Zigzag from '../components/zigzag';

export default function HomePage() {
  // Explicitly define the type of searchTerm as string
  const handleSearch = (searchTerm: string) => {
    console.log(`Search term: ${searchTerm}`);
    // Implement the search functionality here or call another function that handles searching
  };

  return (
    <RootLayout>
      <Header />
      <Hero />
      <SearchBar onSearch={handleSearch} />
      <Zigzag />
      <SecondaryHero />
      {/* Additional content can be placed here */}
      {/* <Footer /> */}
    </RootLayout>
  );
}
