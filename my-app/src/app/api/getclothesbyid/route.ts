import ClothesModel from "@/db/models/clothes";
import { NextResponse } from "next/server";
import { NextApiRequest, NextApiResponse } from 'next';

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  try {
    const searchParams = new URLSearchParams(req?.url);
    const idWithNewline = searchParams.get('http://localhost:3000/api/getclothesbyid?id');
    
    // Decode the URL component
    const decodedId = idWithNewline ? decodeURIComponent(idWithNewline) : null;

    
    // Remove newline character
    const id = decodedId?.trim();


    if (!id) {
      return NextResponse.json({
        error: "Invalid request. Please provide a valid 'id'.",
      });
    }

    const data = await ClothesModel.findOne(id as string);
    console.log(data);
    
    if (!data) {
      return NextResponse.json({
        error: "Clothes not found for the given 'id'.",
      });
    }

    return NextResponse.json({
      data,
    });
  } catch (error) {
    console.error("Error fetching clothes by id:", error);

    return NextResponse.json({
      error: "Internal Server Error",
    });
  }
}
