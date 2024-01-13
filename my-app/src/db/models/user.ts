import { getCollection } from "../config";
import { User } from "@/types";
import { NewUser } from "@/types";
import { hashSync } from "bcryptjs";
import { z } from "zod";

const UserInputSchema = z.object({
  username: z.string(),
  email: z.string().email(),
  password: z.string(),
});

export default class UserModel {
  static getCollectionModel() {
    return getCollection("users");
  }

  static async findUsers() {
    const data = (await this.getCollectionModel().find().toArray()) as User;
    return data;
  }

  static async createUser(newUser: NewUser) {
    const parseResult = UserInputSchema.parse(newUser);
    if (!parseResult) {
      console.log(parseResult);
      throw parseResult;
    }
    return await this.getCollectionModel().insertOne({
      ...newUser,
      password: hashSync(newUser.password, 8),
    });
  }

  static async findUserByEmail(email: string) {
    return (await this.getCollectionModel().findOne({ email })) as User;
  }
}
