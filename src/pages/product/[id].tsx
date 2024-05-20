import { ImageContainer, ProductContainer, ProductDetails } from '@/src/styles/pages/product'
import { useRouter } from 'next/router'

export default function Product() {
    const { query } = useRouter()

    return (
       <ProductContainer>
        <ImageContainer>
            <p>Image</p>
        </ImageContainer>

        <ProductDetails>
            <h1>Camiseta X</h1>
            <span>R$ 79,90</span>
            <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. 
                Aut quibusdam aperiam ad ea sunt voluptates officia corporis 
                eligendi aliquam quam mollitia ab minus iure dolorum blanditiis asperiores eius, unde dolorem!
            </p>

            <button>
                Comprar Agora
            </button>
        </ProductDetails>
       </ProductContainer>
    )
}