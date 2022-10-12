import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request) {
  /*
    Way to protect the urls between the app 
 */
  const token = request.cookies.get("token");
  if (!token) return NextResponse.redirect(new URL("/login", request.url));
  try {
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode("secret")
    );
    console.log({ payload });
    return NextResponse.next();
  } catch (error) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ["/profile/:path*", "/works/:path*"],
};
