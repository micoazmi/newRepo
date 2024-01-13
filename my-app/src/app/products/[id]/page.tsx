"use client";
import CardDetail from "@/components/CardDetail";
import { log } from "blitz";
import { ObjectId } from "mongodb";
import { useState, useEffect } from "react";

interface Detail {
  id: ObjectId;
  bahan: string;
  imageUrl: string;
  name: string;
}

export default function Detail({ params }: { params: { id: number } }) {
  const { id } = params;
  const [productData, setProductData] = useState(null);
  async function fetchOne() {
    try {
      const response = await fetch(
        `http://localhost:3000/api/getclothesbyid?id=${id}`,
        {
          method: "GET",
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      console.log(result, "<----------------------- ini result di page");

      setProductData(result);
      return result; // return the data fetched from the API
    } catch (error) {
      console.error("Error:", error);
      return null; // handle the error and return null or any default value
    }
  }

  useEffect(() => {
    fetchOne();
  }, [id]);

  return (
    <>
      <div className="bg-blue-500 text-white py-4 text-center">
        <h1 className="text-4xl font-bold">Product Details</h1>
      </div>
      <div className="flex flex-wrap gap-8 justify-center p-8">
        <CardDetail data={id} data1={productData}></CardDetail>
      </div>
    </>
  );
}
