import '../styles/globals.css'
import type { AppProps } from 'next/app'
import ChatWidget from '../components/ChatWidget'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <ChatWidget />
    </>
  )
}
