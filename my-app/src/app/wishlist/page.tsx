"use client";
import Navbar from "@/components/navbar";
import { ObjectId } from "mongodb";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
interface Wishlist {
  _id: string;
  userId: string;
  nama: string;
  bahan: string;
  imageUrl: string;
}

async function fetchWishData() {
  try {
    const response = await fetch("http://localhost:3000/api/wishlist/getwish", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();
    return result.data || [];
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
}

async function deleteWishlist(id: string) {
  try {
    const response = await fetch(`http://localhost:3000/api/deletewish`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });

    if (response.status === 200) {
      const result = await response.json();
      return result.data || [];
    } else {
      console.error(
        `Error deleting wishlist. Server responded with status ${response.status}`
      );
      return [];
    }
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
}

export default function Wishlist() {
  const [wishlistData, setWishlistData] = useState<Wishlist[]>([]);
  const router = useRouter();
  const handleDelete = async (id: string) => {
    const updatedData = await deleteWishlist(id);
    setWishlistData(updatedData);
    fetchWishData();
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchWishData();
      setWishlistData(data);
    };

    fetchData();
  }, []);

  return (
    <>
      <Navbar></Navbar>
      <div className="bg-blue-500 text-white py-4 text-center">
        <h1 className="text-4xl font-bold">Your Wishlist</h1>
      </div>
      <div className="flex flex-wrap gap-8 justify-center p-8">
        {wishlistData.map((item) => (
          <div
            key={item._id}
            className="max-w-sm rounded overflow-hidden shadow-lg ml-5 bg-white p-4 hover:shadow-xl"
          >
            <img className="w-full" src={item.imageUrl} />
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">{item.nama}</div>
              <p className="text-gray-700 text-base">{item.bahan}</p>
            </div>
            <div className="px-6 py-4 flex gap-4">
              <div>
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => {
                    handleDelete(item._id);
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
