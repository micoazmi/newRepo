import Link from "next/link";
import { redirect } from "next/navigation";
export default function Register() {
  const handleRegister = async (formData: FormData) => {
    "use server";

    const user = {
      username: formData.get("username"),
      email: formData.get("email"),
      password: formData.get("password"),
    };
    console.log("jalan di page");

    const response = await fetch("http://localhost:3000/api/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    console.log(response.ok, "<--- response");

    if (response.ok) {
      // console.log("masuk");
      redirect("/login");
    } else {
      console.log("error");
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
        <h1 className="text-4xl text-white mb-5">Register </h1>
        <div className="w-full max-w-xs ">
          <form
            action={handleRegister}
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          >
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Username
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="username"
                name="username"
                type="text"
                placeholder="Username"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                email
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                name="email"
                type="text"
                placeholder="email"
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
            <div className="flex items-center justify-center">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                {/* <Link href={"./login"}>SignUp</Link>
                 */}
                Sign Up
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
