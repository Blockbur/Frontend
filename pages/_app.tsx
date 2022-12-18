import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { WeirdsLayout } from '../layouts/WeirdsLayout'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WeirdsLayout>
      <Component {...pageProps} />
    </WeirdsLayout>
  )
}

export default MyApp
