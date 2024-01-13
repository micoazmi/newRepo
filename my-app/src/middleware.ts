import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import * as jose from "jose";
import next from "next";

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/api/wishlist")) {
    const secret = new TextEncoder().encode("secret");

    // console.log(request.cookies);

    let cookie = request.cookies.get("Authorization");
    // console.log(cookie, "<---------- cookie");

    let token = cookie?.value.split(" ")[1];
    console.log(token);
    
    if (!token) {
      console.log("masuk sini ");

      return NextResponse.json({
        message: "Invalid Token",
      });
    }
    const data = await jose.jwtVerify<{ _id: string; email: string }>(
      token,
      secret
    );
    // console.log(token, "ini cookie");
    // console.log(data, "ini data");

    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-user-id", data.payload._id);
    requestHeaders.set("x-user-email", data.payload.email);
    return  NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });

  }


 
  // console.log("test");
  if (request.nextUrl.pathname.startsWith("/products")) {
    let cookie = request.cookies.get("Authorization");
    let token = cookie?.value.split(" ")[1];
    // console.log(cookie);

    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    return NextResponse.next();
  }

  if (request.nextUrl.pathname.startsWith("/wishlist")) {
    let cookie = request.cookies.get("Authorization");
    let token = cookie?.value.split(" ")[1];
    // console.log(cookie);

    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    return NextResponse.next();
  }

  if (request.nextUrl.pathname.startsWith("/login")) {
    let cookie = request.cookies.get("Authorization");
    let token = cookie?.value.split(" ")[1];
    // console.log(cookie);

    if (token) {
      return NextResponse.redirect(new URL("/products", request.url));
    }
    return NextResponse.next();
  }

  // const response = NextResponse.next();
  // return response;
}

// See "Matching Paths" below to learn more
// export const config = {
//   matcher: "/about/:path*",
// };
