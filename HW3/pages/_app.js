/**
 * MyApp - The main application component that wraps all pages.
 */
import "../styles/global.css";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Plan & Plate - Your Recipe Platform</title>
        {/* Favicon */}
        <link rel="icon" type="image/x-icon" href="/images/favicon.ico" />
        {/* Material Icons */}
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        />
      </Head>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow container mx-auto py-8">
          <Component {...pageProps} />
        </main>
        <Footer />
      </div>
    </>
  );
}

export default MyApp;