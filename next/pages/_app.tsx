import type { AppProps } from 'next/app'
import Header from '../components/Header/Header'
import Head from 'next/head'
import GlobalStyle from '../styles/GlobalStyle'
import { ThemeProvider } from 'styled-components'
import { theme } from '../styles/theme'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Damascus</title>
      </Head>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Header />
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  )
}

export default MyApp
