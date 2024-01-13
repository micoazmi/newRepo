import { NextApiRequest, NextApiResponse } from "next";
import ClothesModel from "@/db/models/clothes";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { search } = req.query;

    if (search) {
      // Handle search query and filter data accordingly
      const searchData = await ClothesModel.findBySearchQuery(search as string);
      return res.status(200).json({ data: searchData });
    }

    // If no search query, return all data
    const allData = await ClothesModel.findAll();
    return res.status(200).json({ data: allData });
  } catch (error) {
    console.error("Error fetching data:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
