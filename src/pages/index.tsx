import Image from "next/image";
import Stripe from "stripe";

import { useKeenSlider } from 'keen-slider/react'
import { HomeContainer, Product } from "../styles/pages/home";
import { GetServerSideProps } from "next";
import { stripe } from "../lib/stripe";

import 'keen-slider/keen-slider.min.css'

interface HomeProps {
  product: {
    id: string
    name: string
    imageUrl: string
    price: number
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
    <HomeContainer ref={sliderRef} className="keen-slider">
      {products.map(product => {
        return(
          <Product key={product.id} className="keen-slider__slide">
            <Image src={product.imageUrl} width={520} height={480} alt="" />
            <footer>
              <strong>{product.name}</strong>
              <span>R$ {product.price}</span>
            </footer>
          </Product>
        )
        
      })}
    </HomeContainer>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
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
      price: unitAmount / 100,
    }
  })

  console.log(response.data)

  return {
    props: {
      products
    }
  }
}