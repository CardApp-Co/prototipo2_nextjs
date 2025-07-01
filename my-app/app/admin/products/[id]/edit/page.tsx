

import { PageHeader } from "../../../_components/pageHeader"
import  ProductForm  from "../../_components/ProductForm"
import db from "@/app/db/db"

// export default async function EditProductPage({ params: { id }, }: { params: { id: string } }) {

// const product =  await db.product.findUnique({where: {id}})

// export default async function EditProductPage(props: { params: { id: string } }) {
//   const id = props.params.id

//   const product = await db.product.findUnique({ where: { id } })
type PageProps = {
  params: {
    id: string
  }
}

export default async function EditProductPage({children, params }: { children: React.ReactNode; params: {id: string} }) {
  // Evita desestruturação direta para contornar o bug do Turbopack
  const id = await params

  const product = await db.product.findUnique({
    where: { id }
  })

  if (!product) {
    // Você pode usar notFound() se estiver importando de 'next/navigation'
    return <div>Produto não encontrado</div>
  }

  return (
    <>
      <PageHeader>Edit product</PageHeader>
      <ProductForm product={product} />
    </>
  )
}