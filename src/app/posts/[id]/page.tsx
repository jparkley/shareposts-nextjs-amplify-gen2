import { PostCard } from "@/components/posts/PostCard";
import { client, isAuthenticated } from "@/lib/utils/amplify-utils";
import { deletePost } from "@/lib/actions/actions";

// built-in params in Next.js dynamic routing
type PostParams = {
  params: {
    id: string;
  }  
}

const Post = async ({ params }: PostParams ) => {

  if (!params.id) return null;

  const { data } = await client.models.Post.get(
    { id: params.id },
    {
      authMode: "apiKey",
      selectionSet: ["id", "title", "content", "createdAt"]
    }
  );
  console.log('individual post data', data)

  return (    
      <div className="container-post">
        <PostCard
          post={{
            id:data.id,
            title:data.title,
            content:data.content,
            createdAt: data.createdAt,
          }}
          isDetailPage={true}
          isLoggedIn={await isAuthenticated()}
          onDelete={deletePost}
        />
      </div>
  );
}

export default Post