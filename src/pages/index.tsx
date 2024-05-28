import Image from "next/image";
import Head from 'next/head'
import Stripe from "stripe";
import Link from 'next/link'

import { useKeenSlider } from 'keen-slider/react'
import { HomeContainer, Product } from "../styles/pages/home";
import { GetStaticProps } from "next";
import { stripe } from "../lib/stripe";

import iconArrow from '../assets/arrow.svg'

import 'keen-slider/keen-slider.min.css'

interface HomeProps {
  products: {
    id: string
    name: string
    imageUrl: string
    price: string
  }[]
}

export default function Home({ products }: HomeProps) {
  const [ sliderRef ] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48,
    }
  }) 

  return (
    <>
      <Head>
        <title>Home | Shop</title>

      </Head>


    <HomeContainer ref={sliderRef} className="keen-slider">
      <div>
         <Image src={iconArrow} alt=""/>
      </div>
      {products.map(product => {
        return(
          <Link href={`/product/${product.id}`} key={product.id} prefetch={false}>
              
            <Product className="keen-slider__slide">
              <Image src={product.imageUrl} width={520} height={480} alt="" />
              <footer>
                <strong>{product.name}</strong>
                <span>{product.price}</span>
              </footer>
            </Product>
          </Link>
              
        ) 
      })}
    </HomeContainer>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    expand: ['data.default_price']
  })

  const products = response.data.map(product => {
    const price = product.default_price as Stripe.Price

    const unitAmount = price.unit_amount !== null ? price.unit_amount : 0;

    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }).format(unitAmount / 100),
    }
  })

  // console.log(response.data)

  return {
    props: {
      products
    },
    revalidate: 60 * 60 * 2, // 2 hours
  }
}