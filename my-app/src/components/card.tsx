"use client";
interface Product {
  _id: string;
  bahan: string;
  name: string;
  imageUrl: string;
}
import { useRouter } from "next/navigation";

export default function Card({ data }: { data: Product }) {
  const router = useRouter();
  async function addWishlist(data: Product) {
    const response = await fetch("http://localhost:3000/api/wishlist", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nama: data.name,
        bahan: data.bahan,
        imageUrl: data.imageUrl,
      }),
    });
    const result = await response.json();
    return result;
  }

  const handleAddToWishlistClick = async () => {
    try {
      const result = await addWishlist(data);
      // Handle the result as needed
      console.log("Wishlist result:", result);
    } catch (error) {
      console.error("Error adding to wishlist:", error);
    }
  };

  const handleNavigation = (id: string) => {
    router.push(`/products/${id}`);
  };

  return (
    <>
      <div className="max-w-sm rounded overflow-hidden shadow-lg ml-5">
        <img
          className="w-full"
          src={`${data.imageUrl}`}
          alt="Sunset in the mountains"
        />
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{data.name}</div>
          <p className="text-gray-700 text-base">{data?.bahan}</p>
        </div>
        <div className="px-6 py-4 flex gap-4">
          <div>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => handleNavigation(data._id)}
            >
              Detail
            </button>
          </div>
          <div>
            <button
              onClick={handleAddToWishlistClick}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Add to Wishlist
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
