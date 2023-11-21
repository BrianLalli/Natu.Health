export const metadata = {
  title: 'Natu.Health',
  description: 'Home page with website description',
};

import Hero from '@/components/hero';
import Zigzag from '@/components/zigzag';
import SecondaryHero from '../../components/secondaryHero';
import FAQ from '../../components/faq';
// import QuizComponent from '../../components/quiz-component.client';

export default function Home() {
  return (
    <>
      <Hero />
      <Zigzag />
      <SecondaryHero />
      {/* <QuizComponent /> */}
      <FAQ />
    </>
  );
}
