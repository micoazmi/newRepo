import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import FlashMessage from "@/components/flashmessage";
import { useState } from "react";
interface MyResponse {
  message: string;
  access_token: string;
}
export default function Login() {
  const handleLogin = async (formData: FormData) => {
    "use server";

    const user = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    // console.log("terclick");
    const response = await fetch("http://localhost:3000/api/users/login", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    if (response.ok) {
      // const { access_token } = await response.json();
      const { access_token } = (await response.json()) as MyResponse;
      cookies().set("Authorization", `Bearer ${access_token}`);
      if (access_token) {
        redirect("/products");
      } else {
        console.log("error");
      }
    } else {
      console.log("gagal login");
    }
  };
  return (
    <>
      <div
        style={{
          margin: "auto",
          padding: "10vh 0",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h1 className="text-4xl text-white mb-5">Login </h1>
        <div className="w-full max-w-xs ">
          <form
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
            action={handleLogin}
          >
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Email
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="username"
                type="text"
                placeholder="Email"
                name="email"
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Password
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                name="password"
                placeholder="******************"
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Sign In
              </button>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
              >
                <Link href={"/register"}>Register</Link>
              </button>
            </div>
          </form>
          <p className="text-center text-gray-500 text-xs">
            &copy;2020 Acme Corp. All rights reserved.
          </p>
        </div>
      </div>
    </>
  );
}
