import { cookies } from "next/headers";

export const handleLogin = async (formData: FormData) => {
    "use server";
    console.log(formData.get("email"));

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
      const { access_token } = await response.json();
      cookies().set("Authorization", `Bearer ${access_token}`);

    }

  };