import Card from "@/components/card";
import Link from "next/link";

export interface Product {
  _id: string;
  bahan: string;
  name: string;
  imageUrl: string;
}
interface ResponseData {
  data: Product[];
  // other properties if any
}
// async function getData() {
//   const response = await fetch("http://localhost:3000/api/clothes", {
//     method: "GET", // or 'PUT'
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });
//   const result = (await response.json()) as ResponseData;
//   return result;
// }

async function getData(searchQuery?: string) {
  const apiUrl = searchQuery
    ? `http://localhost:3000/api/clothesquery?search=${encodeURIComponent(
        searchQuery
      )}`
    : "http://localhost:3000/api/clothes";

  const response = await fetch(apiUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const result = (await response.json()) as ResponseData;
  return result;
}

export default async function Product() {
  const { data } = await getData();
  // console.log({ data });

  return (
    <>
      <div className="w-full h-72 bg-blue-500 text-white flex flex-col items-center justify-center text-center">
        <h1 className="text-4xl mb-4">Welcome to Our Product Page</h1>
        <p className="text-lg mb-8">
          Discover amazing products that fit your needs.
        </p>
        <a
          href="#products"
          className="inline-block px-6 py-3 text-lg bg-white text-blue-500 rounded hover:bg-blue-500 hover:text-white transition"
        >
          Explore Products
        </a>
      </div>
      <div className="bg-blue-500 text-white p-4 text-center">
        <form>
          <input
            type="text"
            placeholder="Search..."
            className="border p-2 rounded"
          />
          <button
            type="submit"
            className="bg-white text-blue-500 border border-white py-2 px-4 rounded hover:bg-blue-700 hover:text-white transition"
          >
            Submit
          </button>
        </form>
      </div>

      <div className="flex flex-wrap gap-8 justify-center  bg-blue-500 p-8">
        {data.map((el: Product) => (
          <div key={el._id} className="bg-white rounded-md p-4 shadow-md">
            <Card data={el}></Card>
          </div>
        ))}
      </div>
    </>
  );
}
