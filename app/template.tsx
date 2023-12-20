'use client';

import Footer from '@/components/layouts/Footer/Footer';
import Header from '@/components/layouts/Header/Header';
import '@/scss/style.scss';

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
