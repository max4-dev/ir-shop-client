'use client';

import { Footer, Header } from '@/components/layouts';
import '@/scss/style.scss'

function RootTemplate({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <>
      <Header />
      <main className='main'>
        {children}
      </main>
      <Footer />
    </>
  )
}

export default RootTemplate;
