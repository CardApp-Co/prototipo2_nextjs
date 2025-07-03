
import { NextRequest, NextResponse } from "next/server"
import { isValidPassword } from "./lib/isValidPassword"


async function isAuthenticated(req: NextRequest) {
  const authHeader = req.headers.get("authorization") || req.headers.get("Authorization")

  if (authHeader == null) return false

  const [username, password] = Buffer.from(authHeader.split(" ")[1], "base64").toString().split(":")
  
  return username === process.env.ADMIN_USERNAME && (await isValidPassword(password, process.env.HASHED_ADMIN_PASSWORD as string))

}


export async function middleware(req: NextRequest) {
  console.log("🔒 Middleware executado para:", req.nextUrl.pathname)

  if ((await isAuthenticated(req)) === false) {
    console.log("⛔️ Não autenticado")
    return new NextResponse("Unauthorized", {
      status: 401,
      headers: { "WWW-Authenticate": "Basic" },
    })
  }

  console.log("✅ Autenticado")
  return NextResponse.next()
}

export const config = {
  matcher: "/admin/:path*",
}