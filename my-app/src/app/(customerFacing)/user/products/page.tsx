import DefaultHeader from "../../components/defaultHeader";
import ProductsPage from "../../products/page";
import { UserProductPage } from "../[id]/page";

import './styles/style_header.css'

export default function TelaUserProduct(){
    return(
        <>
        <DefaultHeader />
        <UserProductPage />

        </>
    );
}