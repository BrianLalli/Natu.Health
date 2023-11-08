export const metadata = {
  title: 'Home - Open PRO',
  description: 'Page description',
};

import Hero from '@/components/hero';
import Zigzag from '@/components/zigzag';
import SecondaryHero from '../../components/SecondaryHero';
import FAQ from '../../components/faq';
// import QuizComponent from '../../components/quiz-component.client';

export default function Home() {
  return (
    <>
      <Hero />
      <Zigzag />
      <FAQ />
      <SecondaryHero />
      {/* <QuizComponent /> */}
    </>
  );
}