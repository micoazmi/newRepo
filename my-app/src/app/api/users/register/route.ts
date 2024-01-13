import UserModel from "@/db/models/user";
import { ZodError } from "zod";

export async function POST(request: Request) {
  try {
    console.log("jalan");

    const body: { username: string; email: string; password: string } =
      await request.json();
    const result = await UserModel.createUser(body);

    return Response.json({
      message: "User created succesfully",
    });
  } catch (error) {
    if (error instanceof ZodError) {
      const err = error.issues[0].path + " ";
      return Response.json({
        error: err,
      });
    }
    return Response.json({
      message: "Internal Server Error",
    });
  }
}
