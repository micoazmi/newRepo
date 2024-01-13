import { ObjectId } from "mongodb";
import { getCollection } from "../config";

export default class ClothesModel {
  static getCollectionModel() {
    return getCollection("clothes");
  }
  static async findAll() {
    const data = await this.getCollectionModel().find().toArray();
    return data;
  }
  static async findByPage(pageNumber:number, pageSize:number) {
    const skip = (pageNumber - 1) * pageSize;
    const data = await this.getCollectionModel().find().skip(skip).limit(pageSize).toArray();
    return data;
  }
  static async findOne(id:string) {
    const newId= new ObjectId(id)
    
    const data = await this.getCollectionModel().find({_id:newId}).toArray();
    return data;
  }
  static async findBySearchQuery(searchQuery: string) {
    // Customize this method to filter data based on the search query
    const data = await this.getCollectionModel()
      .find({ $text: { $search: searchQuery } }) // Example: MongoDB text search
      .toArray();
  
    return data;
  }
}
