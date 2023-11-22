import React, { useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';

import Script from 'next/script';

import { Layout } from '../components';
import '../styles/globals.css';
import { StateContext } from '../context/StateContext';

function MyApp({ Component, pageProps }) {
  const [nonce, setNonce] = useState(null);

  useEffect(() => {
    fetch('https://us-central1-winged-quanta-385223.cloudfunctions.net/generate-nonce')
      .then(response => response.json())
      .then(data => {
        setNonce(data.nonce);
      })
      .catch(error => {
        console.error('Error fetching nonce:', error);
      });
  }, []);

  return (
    // passes the data from <StateContext /> to every component inside it
    <StateContext>
      <Layout>

        {/* Facebook Meta Pixel Code */}
        <Script id="meta-facebook-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '1016634729672804');
            fbq('track', 'PageView');
          `}
        </Script>

        {/* Google Tag Manager Code */}
        {nonce && (
        <Script id="google-tag-manager" strategy="afterInteractive" nonce={nonce}>
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${process.env.NEXT_PUBLIC_GTM_ID}');
          `}
        </Script>
      )}
        <Toaster />
        {/* "Component" is a dynamic component based on which page user is on */}
        <Component {...pageProps} />
      </Layout>
    </StateContext>
  )
}

export default MyApp;
