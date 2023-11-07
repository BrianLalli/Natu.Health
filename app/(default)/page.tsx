export const metadata = {
  title: 'Home - Open PRO',
  description: 'Page description',
}

import Hero from '@/components/hero'
import Zigzag from '@/components/zigzag'
import SecondaryHero from '../../components/SecondaryHero'

export default function Home() {
  return (
    <>
      <Hero />
      <Zigzag />
      <SecondaryHero />
    </>
  )
}
