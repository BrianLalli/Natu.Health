import React from 'react';
import { useRouter } from 'next/router'; // Import useRouter from next/router
import RootLayout from '@/app/layout'; // Adjust according to your project structure
import Hero from '../components/hero'; // Adjust the import path
import SecondaryHero from '../components/secondaryHero'; // Adjust the import path
import Zigzag from '../components/zigzag';
import AboutUs from '../components/about-us';
// import OurApproach from '../components/our-approach';

export default function HomePage() {
  const router = useRouter(); // Use the useRouter hook for navigation

  // Adjust handleSearch to use Next.js router
  const handleSearch = (specialty: string, zipCode: string) => {
    // Redirect to the PractitionersComponent with the appropriate query parameters
    router.push(`/practitioners?focusArea=${encodeURIComponent(specialty)}&zipCode=${encodeURIComponent(zipCode)}`);
  };

  return (
    <RootLayout>
      <Hero onSearch={handleSearch} />
      <AboutUs />
      <Zigzag />
      {/* <OurApproach /> */}
      <SecondaryHero />
    </RootLayout>
  );
}
