import WishlistModel from '@/db/models/wishlist';
import { ObjectId } from 'mongodb';
import { NextResponse } from 'next/server';

export async function DELETE(request: Request) {
  try {
    const { id }: { id: string } = await request.json();
    console.log(id,'<-------------- iini id ynag diterima');
    

    if (!id) {
      return NextResponse.json({
        message: "Invalid request. Please provide a valid 'id'.",
      });
    }

    const result = await WishlistModel.deleteWishlist(id);

    return NextResponse.json({
      message: "Delete successful",
      result,
    });
  } catch (error) {
    console.error('Error deleting wishlist:', error);

    return NextResponse.json({
      message: "Internal Server Error",
    });
  }
}