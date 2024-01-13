import WishlistModel from "@/db/models/wishlist";
import { ObjectId } from "mongodb";

export async function POST(request: Request) {
  const userId = request.headers.get("x-user-id");
  // console.log(userId,'<---------ini user id');
  
  if (!userId) {
    return new Response("Missing x-user-id header", { status: 400 });
  }

  try {
    const userIdObj = new ObjectId(userId);
    const { nama, bahan, imageUrl } = await request.json();

    // Assuming you have the required data in the request body.
    // If not, adjust accordingly based on your data source.

    const data = await WishlistModel.addWishlist(userIdObj, nama, bahan, imageUrl);
    console.log(data);
    
    return new Response(JSON.stringify({ data }), { status: 200, headers: { "Content-Type": "application/json" } });
  } catch (error) {
    console.error(error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
