import '../styles/globals.css'
import 'tailwindcss/tailwind.css';
import Nav from '../components/navbar';
import Footer from '../components/footer';

import Head from 'next/head';

function MyApp({ Component, pageProps }) {
    return <>
        <Head>
            <link rel="shortcut icon" href="/favicon.ico" />
        </Head>
        <Nav />
        <Component {...pageProps} />
        {/* <Footer /> */}
    </>
}

export default MyApp