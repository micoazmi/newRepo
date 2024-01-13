export async function GET(request: Request) {
  return Response.json({
    data: {
      id: 1,
      username: "budi",
      email: "budi@mail.com",
    },
  });
}
