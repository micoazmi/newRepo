import ClothesModel from "@/db/models/clothes";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const data = await ClothesModel.findAll();
  return NextResponse.json({
    data,
  });
}
