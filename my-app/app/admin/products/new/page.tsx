import { PageHeader } from "@/app/admin/_components/pageHeader" 
import ProductForm from "../_components/ProductForm"

export default function NewProductPage() {

    return(
        <>
        <PageHeader>Add product</PageHeader>
        <ProductForm />
        </>
    )
}