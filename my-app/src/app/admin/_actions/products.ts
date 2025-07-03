"use server"

import { z } from "zod"
import db from "@/src/db/db"
import fs from "fs/promises"
import { notFound, redirect } from "next/navigation"
import { revalidatePath } from "next/cache"

// const fileSchema = z.instanceof(File, {message: "Required"})

// const imageSchema = fileSchema.refine(file => file.size === 0 || file.type.startsWith("image/"))

// const imageSchema = z.instanceof(File, { message: "Imagem obrigatória" }).refine(
//   file => file.size > 0 && file.type.startsWith("image/"),
//   "Arquivo inválido"
// )

const imageSchema = z
  .instanceof(File)
  .refine(file => file.size === 0 || file.type.startsWith("image/"), "Arquivo inválido")

const addSchema = z.object({
    name: z.string().min(1),
    description: z.string().min(1),
    priceInCents: z.coerce.number().int().min(1),
    image: imageSchema // imageSchema.refine(file => file.size > 0, "Required")

})

export async function addProduct(_: unknown, formData: FormData) {
  // const name = formData.get("name")
  // const description = formData.get("description")
  // const priceInCents = formData.get("priceInCents")
  // const image = formData.get("image")

  // const parsed = addSchema.safeParse({
  //   name,
  //   description,
  //   priceInCents,
  //   image,
  // })

  // if (!parsed.success) {
  //   return parsed.error.formErrors.fieldErrors
  // }

  // const data = parsed.data

// export async function addProduct(prevState: unknown, formData: FormData) {
    const result = addSchema.safeParse(Object.fromEntries(formData.entries()))
   if (result.success === false){
    return result.error.formErrors.fieldErrors
   }

   const data = result.data

   await fs.mkdir("public/products", {recursive: true})
   const imagePath = `/products/${crypto.randomUUID()}-${data.image.name}`
   await fs.writeFile(`public${imagePath}`, Buffer.from(await data.image.arrayBuffer()))

   await db.product.create({data: {
    isAvailableForPurchase: false,
    name: data.name,
    description: data.description,
    priceInCents: data.priceInCents,
    imagePath,
   },})
  


   revalidatePath("/")
   revalidatePath("/products")
   redirect("/admin/products")
}

const editSchema = addSchema.extend({image: imageSchema.optional()})

export async function updateProduct(id: string, _: unknown, formData: FormData) {
  const name = formData.get("name")
  const description = formData.get("description")
  const priceInCents = formData.get("priceInCents")
  const image = formData.get("image")

  const parsed = editSchema.safeParse({
    name,
    description,
    priceInCents: typeof priceInCents === "string" ? Number(priceInCents) : priceInCents,
    image,
  })

  if (!parsed.success) {
    return parsed.error.formErrors.fieldErrors
  }

  const data = parsed.data

  //  const result = editSchema.safeParse(Object.fromEntries(formData.entries()))
  //  if (result.success === false){
  //   return result.error.formErrors.fieldErrors
  //  }

  //  const data = result.data
  const product = await db.product.findUnique({where: {id}})

  if(product == null) return notFound()

// export async function addProduct(prevState: unknown, formData: FormData) {
//     const result = addSchema.safeParse(Object.fromEntries(formData.entries()))
//    if (result.success === false){
//     return result.error.formErrors.fieldErrors
//    }

//    const data = result.data
// let imagePath = product.imagePath

// if(data.image != null && data.image.size > 0){
//    await fs.unlink(`public${product.imagePath}`)
//    imagePath = `/products/${crypto.randomUUID()}-${data.image.name}`
//    await fs.writeFile(`public${imagePath}`, Buffer.from(await data.image.arrayBuffer()))
// }
//    await db.product.update({
//     where: {id}, 
//     data: {
//     isAvailableForPurchase: false,
//     name: data.name,
//     description: data.description,
//     priceInCents: data.priceInCents,
//     imagePath,
//    },})
//   console.log("blabla")

let updateData: any = {
  name: data.name,
  description: data.description,
  priceInCents: data.priceInCents,
}

// Se uma nova imagem foi enviada, atualiza `imagePath`
if (data.image && data.image.size > 0) {
  // Apaga a imagem anterior se existir
  if (product.imagePath) {
    await fs.unlink(`public${product.imagePath}`).catch(() => {
      console.warn("Imagem anterior não encontrada para deletar.")
    })
  }

  const newImagePath = `/products/${crypto.randomUUID()}-${data.image.name}`
  await fs.writeFile(`public${newImagePath}`, Buffer.from(await data.image.arrayBuffer()))

  updateData.imagePath = newImagePath
}
await db.product.update({
  where: { id },
  data: updateData,
})



   revalidatePath("/")
   revalidatePath("/products")
   redirect("/admin/products")
}


export async function toggleProductAvailability(id: string, isAvailableForPurchase: boolean){
await db.product.update({where: {id}, data:{isAvailableForPurchase}})


   revalidatePath("/")
   revalidatePath("/products")
}

export async function deleteProduct(id: string){
   const product = await db.product.delete({where: {id}})
   if (product == null) return notFound()
    await fs.unlink(`public${product.imagePath}`)

   
   revalidatePath("/")
   revalidatePath("/products")
}