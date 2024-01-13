import { ObjectId } from "mongodb";
import type { Metadata } from "next";

export let metadata: Metadata = {
  title: "Detail",
};
interface Detail {
  id: ObjectId;
  bahan: string;
  imageUrl: string;
  name: string;
  // Add other properties as needed
}
interface CardDetailProps {
  data: number;
  data1: Detail | null; // Assume Detail is your type for productData
}

const CardDetail: React.FC<CardDetailProps> = ({ data, data1 }) => {
  console.log(data1);
  return (
    <>
      {data1 ? (
        <div className="max-w-sm rounded overflow-hidden shadow-lg ml-5">
          <h1>Card id = {data}</h1>
          <img
            className="w-full"
            src={data1?.data[0]?.imageUrl}
            alt={data1.name}
          />
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">{data1.data[0]?.name}</div>
            <p className="text-gray-700 text-base">{data1.data[0]?.bahan}</p>
          </div>
          <div className="px-6 pt-4 pb-2">{/* Your other details here */}</div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
};

export default CardDetail;
