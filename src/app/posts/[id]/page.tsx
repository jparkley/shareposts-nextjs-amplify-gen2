import { client } from "@/lib/utils/amplify-utils";

// built-in params in Next.js dynamic routing
type PostParams = {
  params: {
    id: string;
  }  
}

const Post = async ({ params }: PostParams ) => {

  if (!params.id) return null;

  const { data } = await client.models.Post.get(
    {
      id: params.id
    },
    {
      authMode: "apiKey",
      selectionSet: ["id", "title", "content", "createdAt"]
    }
  );
  console.log('individual post data', data)

  return (
    <div>
        {data.title}
        {data.content}
    </div>
  )
}

export default Post