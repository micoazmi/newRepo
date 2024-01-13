import UserModel from "@/db/models/user";

export async function GET(request: Request) {
  const data = await UserModel.findUsers();
  console.log(request.headers.keys());
  console.log("ini user yanhg login ",request.headers.get("x-user-id"));
  console.log("ini user yanhg login ",request.headers.get("x-user-email"));
  
  
  return Response.json({
    data,
  });
}
