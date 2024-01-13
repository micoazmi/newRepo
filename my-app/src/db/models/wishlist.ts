import { ObjectId } from "mongodb";
import { getCollection } from "../config";

export default class WishlistModel {
  static getCollectionModel() {
    return getCollection("wishlist");
  }
  static async addWishlist(
    id: ObjectId,
    nama: string,
    bahan: string,
    imageUrl: string
  ) {
    const userIdObj = new ObjectId(id);
    const data = await this.getCollectionModel().insertOne({
      userId: userIdObj,
      nama,
      bahan,
      imageUrl,
    });
    return data;
  }
  static async getWishlist(userId: ObjectId){

    const data = await this.getCollectionModel().find({ userId }).toArray()
    return data
  }

  static async deleteWishlist(id: string){
    const idWish= new ObjectId(id)
    console.log(idWish,'<------------- di db model');
    
    const data = await this.getCollectionModel().deleteOne({_id:idWish})
    return data
  }
}
