import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Header from '../components/Header/Header'
import Head from 'next/head'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Damascus</title>
      </Head>
      <Header />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
