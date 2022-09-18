import React from 'react';

import { Layout } from '../components';
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    // "Component" is a dynamic component based on which page user is on
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp
