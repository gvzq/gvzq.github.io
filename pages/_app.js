import '../styles/globals.css'
import 'tailwindcss/tailwind.css';
import Nav from '../components/navbar';

function MyApp({ Component, pageProps }) {
    return <>
        <Nav />
        <Component {...pageProps} />
    </>
}

export default MyApp