import React from 'react';
import { Toaster } from 'react-hot-toast';

import { Layout } from '../components';
import '../styles/globals.css'
import { StateContext } from '../context/StateContext';

function MyApp({ Component, pageProps }) {
  return (
    // passes the data from <StateContext /> to every component inside it
    <StateContext>
      <Layout>
        <Toaster />
        {/* "Component" is a dynamic component based on which page user is on */}
        <Component {...pageProps} />
      </Layout>
    </StateContext>

  )
}

export default MyApp
