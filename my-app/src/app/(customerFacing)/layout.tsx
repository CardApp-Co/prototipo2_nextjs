import { Nav, NavLink } from "@/src/components/Nav"
import "./style.css";

export const dynamic = "force-dynamic"

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    // <>
    //   <Nav>
    //     <NavLink href="/">Home</NavLink>
    //     <NavLink href="/products">Products</NavLink>
    //     <NavLink href="/orders">My Orders</NavLink>
    //   </Nav>
    //   <div className="container my-6">{children}</div>
    // </>
            <>
            <header>
                <div className="divLogo">
                    <img className="logo" src="/imagens/cardapp-logo-nome.png" alt="cardapp-logo-nome" />
                </div>
            </header>

            <div className="navbar">
                <ul>
                    <li id="user-male"><img src="/imagens/user-male.png" alt="user-male" /></li>
                    <li><a href="/">HOME PAGE &gt; </a></li>
                    <li><a href="/products">FILTROS &gt;</a></li>
                    <li><a href="/orders">CARRINHO &gt;</a></li>
                </ul>
            </div>
            <div className="container my-6">{children}</div>
        </>

  )
}