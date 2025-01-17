import type { PropsWithChildren } from 'react';
import Header from './header';
import Footer from './footer';

const Layout = ({ children }: PropsWithChildren) => {
    return (
        <div className='bg-gradient-to-br from-background to-muted'>
            <Header />
            <main className='min-h-screen container mx-auto px-4 py-8'>
                {children}
            </main>
            {/* <footer className='border-t backdrop-blur py-12 supports-[backdrop-filter]:bg-background/60'>
                <div className='container mx-auto px-4 py-8 text-center text-grey-200'>
                    Made by Nilava
                </div>
            </footer> */}
            <Footer />
        </div>
    )
}

export default Layout