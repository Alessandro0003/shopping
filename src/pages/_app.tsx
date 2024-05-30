import type { AppProps } from 'next/app'
import { globalStyles } from '../styles/global'

import logoImg from '../assets/logo.svg'
import logoCart from '../assets/cart.svg'
import { Container, Header } from '../styles/pages/app'

import Image from 'next/image'

// console.log(logoImg)

globalStyles()

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Container>
      <Header>
        <Image src={logoImg} alt="" />
        <div>
          <Image src={logoCart} alt="" width={30} height={30} />
        </div>
      </Header>
      <Component {...pageProps} />
    </Container>
  )
}
