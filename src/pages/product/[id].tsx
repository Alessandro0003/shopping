import { stripe } from '@/src/lib/stripe'
import { ImageContainer, ProductContainer, ProductDetails } from '@/src/styles/pages/product'
import { GetServerSideProps, GetStaticPaths, GetStaticProps } from 'next'
import Image from 'next/image'
import { useRouter } from 'next/router'
import Stripe from 'stripe'

interface ProductProps {
    product: {
      id: string
      name: string
      imageUrl: string
      price: string
      description: string
    }
  }

export default function Product({ product }: ProductProps) {
    // console.log(product)
    
    // const { isFallback } = useRouter()

    // if (isFallback) {
    //     implementation future 
    //     return <p>skeleton screen</p>
    // }

    return (
       <ProductContainer>
        <ImageContainer>
            <Image src={product.imageUrl} width={520} height={480} alt="" />
        </ImageContainer>

        <ProductDetails>
            <h1>{product.name}</h1>
            <span>{product.price}</span>
            <p>{product.description}</p>

            <button>
                Comprar Agora
            </button>
        </ProductDetails>
       </ProductContainer>
    )
}

export const getStaticPaths: GetStaticPaths = async () => {
    // Buscar os produtos mais vendidos / mais acessados

    return {
        paths: [
            { params: {id: 'prod_Q7RPoL5kUQOXVf' } },
            { params: {id: 'prod_Q7RM3i9xl9duAa' } },
            { params: {id: 'prod_Q7RNoMGWLPDJQO' } },
        ],
        fallback: 'blocking',
    }
}

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({ params }) => {

    if (!params || !params.id) {
        throw new Error('Product Id is missing')
    }

    const productId = params.id
  
    const product = await stripe.products.retrieve(productId, {
      expand: ['default_price']
    })
  
    const price = product.default_price as Stripe.Price
    
    const unitAmount = price.unit_amount !== null ? price.unit_amount : 0
  
    return {
      props: {
        product: {
          id: product.id,
          name: product.name,
          imageUrl: product.images[0],
          price: new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
          }).format(unitAmount / 100),
          description: product.description
        }
      },
      revalidate: 60 * 60 * 1 // 1 hours
    }
}