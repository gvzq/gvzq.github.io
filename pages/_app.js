import '../styles/globals.css'
import 'tailwindcss/tailwind.css';
import Nav from '../components/navbar';
import Footer from '../components/footer';
import Head from 'next/head';
import Script from 'next/script'

function MyApp({ Component, pageProps }) {
    const clarityMicrosoft = `(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window, document, "clarity", "script", "dui4jwiwac");`;
    return <>
        <Head>
            <link rel="apple-touch-icon" sizes="180x180" href="manifest/apple-touch-icon.png" />
            <link rel="icon" type="image/png" sizes="32x32" href="manifest/favicon-32x32.png" />
            <link rel="icon" type="image/png" sizes="16x16" href="manifest/favicon-16x16.png" />
            <link rel="manifest" href="manifest/site.webmanifest" />
        </Head>
        <Nav />
        <Component {...pageProps} />
        <Footer />
        <Script dangerouslySetInnerHTML={{ __html: clarityMicrosoft }} />
    </>
}

export default MyApp