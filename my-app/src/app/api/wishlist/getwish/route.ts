import WishlistModel from '@/db/models/wishlist';
import { ObjectId } from 'mongodb';
import { NextResponse } from 'next/server';

// Define the route handler for GET wishlist
export async function GET(request:Request) {
  const userId = request.headers.get('x-user-id');

  if (!userId) {
    return NextResponse.json({
      status: 400,
      body: 'User ID is missing in the request headers.',
    });
  }

  try {
    const userIdObj = new ObjectId(userId);
    const data = await WishlistModel.getWishlist(userIdObj);
    return NextResponse.json({ data });
  } catch (error) {
    console.error('Error retrieving wishlist:', error);
    return NextResponse.json({
      status: 500,
      body: 'Internal Server Error',
    });
  }
}