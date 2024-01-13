const { MongoClient, ServerApiVersion } = require("mongodb");
const uri =
  "mongodb+srv://micoazmi:12345@project1.ye7hcth.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

export const db = client.db("challange_2");
export const getCollection = (collectionName: string) => {
  console.log("nyambung db ");

  return db.collection(collectionName);
};
