import UserModel from "@/db/models/user";
import { compareSync } from "bcryptjs";
import { ZodError } from "zod";
import * as jose from "jose";
import { sign } from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const secret: string = "secret";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();
    const user = await UserModel.findUserByEmail(email);
    if (!user) {
      return Response.json({
        message: "Invalid email/pass",
      });
    }
    const validate = compareSync(password, user.password);
    if (!validate) {
      return Response.json({
        message: "Invalid email/pass",
      });
    }

    const token = sign({ _id: user._id }, secret);

    const response = NextResponse.json({
      message: "login berhasil",
      access_token: token,
    });

    response.cookies.set("Authorization", "Bearer " + token);
    return response;
  } catch (error) {
    console.log(error);

    return Response.json({
      message: "Internasl Server Error",
    });
  }
}
