import React from 'react';
import { Toaster } from 'react-hot-toast';
import Script from 'next/script';

import { Layout } from '../components';
import '../styles/globals.css';
import { StateContext } from '../context/StateContext';

function MyApp({ Component, pageProps }) {
  return (
    // passes the data from <StateContext /> to every component inside it
    <StateContext>
      {/* Google Analytics gtag */}
      <Script src="https://www.googletagmanager.com/gtag/js?id=G-BW4F0N355Z" strategy="afterInteractive" />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-BW4F0N355Z');
        `}
      </Script>

      <Layout>
        <Toaster />
        {/* "Component" is a dynamic component based on which page user is on */}
        <Component {...pageProps} />
      </Layout>
    </StateContext>
  )
}

export default MyApp;
